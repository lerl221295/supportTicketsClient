import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { deleteField, setFields, closeModal } from '../../actions/customFields'
import TicketMetadata from '../../graphql/querys/ticketMetadata.graphql'
import UpdateCustomFields from '../../graphql/mutations/updateCustomFields.graphql'
import CustomFields from '../presentationals/customFields/CustomFields' 
import { openAlert } from '../../../../common/actions/alert'
import Drawable from '../../../../common/components/Drawable'
import Theme from '../../../../theme-default'

const ReduxContainer = connect(
	({ticketFields: {customFields, modals} }) => ({
		custom_fields: customFields.fields,
		modals: customFields.modals,
		itemsName: 'custom_fields'
	}),
	{ deleteField, setItems: setFields, openAlert, closeModal }
);


const ApolloContainer = graphql(UpdateCustomFields, {
	props: ({ownProps: {custom_fields, openAlert, ...rest}, mutate}) => ({
		custom_fields,
		rest,
		update: () => 
			mutate({ 
				variables: { custom_fields }, 
				update: updateApolloCache(custom_fields) 
			})
			.then(response => openAlert("Campos Personalizables Actualizados Exitosamente"))	
	})
});

const updateApolloCache = custom_fields => (proxy, {data: {updateTicketTypes} }) => {
	try {
		const data = proxy.readQuery({ query: TicketMetadata });

		data.ticketMetadata.custom_fields = custom_fields.map(field => {
			const custom = do {
				if(field.type === "SELECT") ({
					__typename: "SelectField",
					options: field.options.map(option => ({
						...option,
						__typename: 'SelectOption'
					}))
				});
				else ({__typename: "FreeField"})
			}

			return ({
				...field,
				...custom
			})
		});
	    
	    proxy.writeQuery({ query: TicketMetadata, data});
	}
	catch(e){
		console.log(e);
	}
}

export default compose(
	ReduxContainer,
	Drawable,
	ApolloContainer
)(CustomFields)