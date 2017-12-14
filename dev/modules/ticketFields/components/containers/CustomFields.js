import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { deleteField, setFields, closeModal } from '../../actions/customFields'
import TicketMetadata from '../../graphql/querys/ticketMetadata.graphql'
import UpdateCustomFields from '../../graphql/mutations/updateCustomFields.graphql'
import CustomFields from '../presentationals/customFields/CustomFields' 
import { openAlert } from '../../../../common/actions/alert'
import hexToRgbA from '../../../../common/utils/hexToRgbA'
import Theme from '../../../../theme-default'

const ReduxContainer = connect(
	({ticketFields: {customFields, modals} }) => ({
		custom_fields: customFields.fields,
		modals: customFields.modals
	}),
	{ deleteField, setFields, openAlert, closeModal }
);

const CustomContainer = WrappedComponent => class FieldsDrawable extends Component {
	reorderFields = (startIndex, endIndex) => {
		const result = [...this.props.custom_fields];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result.map((field, i) => ({
			...field,
			position: i+1
		}))
	};

	onDragEnd = ({source, destination}) => {
		// dropped outside the list
		if (!destination) {
			return;
		}

		const { setFields } = this.props;
		const fields = this.reorderFields(source.index, destination.index);
		
		setFields(fields);
	};

	getItemStyle = (draggableStyle, isDragging) => {
		// console.log('draggableStyle', draggableStyle);
		return ({
			// some basic styles to make the items look a bit nicer
			userSelect: 'none',
			// change background colour if dragging
			backgroundColor: do {
				if (isDragging) hexToRgbA(Theme.palette.primary1Color, 0.5);
				else ''
			},
			// styles we need to apply on draggables
			...draggableStyle,
		});
	}

	render = () => (
		<WrappedComponent 
			{...this.props}
			onDragEnd={this.onDragEnd}
			getItemStyle={this.getItemStyle}
		/>
	)

}

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
	CustomContainer,
	ApolloContainer
)(CustomFields)