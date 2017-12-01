import React from 'react'
import { withApollo } from 'react-apollo'
import { reduxForm } from 'redux-form'
import diff from 'object-diff'

import TicketPropsForm from '../presentationals/details/PropsForm'

const FormWithRedux = reduxForm({ 
	form: 'TicketDetailsForm'
})(TicketPropsForm)

const TicketPropsWithApollo = withApollo(({client: apolloClient, ...props}) => {
	const searchData = (key, GraphqlQuery) => (search_text) => (
		apolloClient.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
		.then( ({data} ) => ({options: data[key].nodes}))
	);


	let initialValues = {
		state: props.ticket.state.key,
		priority: props.ticket.priority,
		type: props.ticket.type.key,
		source: props.ticket.source,
		agent: props.ticket.agent,
		group: props.ticket.group,
		supplier: props.ticket.supplier
	}

	for(let {type, value, key} of props.custom_fields){
		initialValues[key] = do {
			if(
				type === "TEXT" || 
				type === "TEXTAREA"
			) value.text;
			else if(type === "DATE") new Date(value.text);
			else if(type === "NUMBER") value.number;
			else if(type === "SELECT") value.key;
			else if(type === "CHECKBOX") value.check;
		};
	}

	const update = (values, arg2, {untouch}) => {
		//console.log(diff(initialValues, values))
		initialValues = {
			...initialValues,
			...values
		}
		console.log(initialValues);
		untouch('TicketDetailsForm', ['color']);
	}

	let orderly = Array.from(props.custom_fields)
		.sort((a, b) => a.position - b.position);	

	return(
		<FormWithRedux 
			onSubmit={update} 
			{...props} 
			custom_fields={orderly}
			searchData={searchData}
			initialValues={initialValues}
		/>
	)
})

/*falta graphql para la mutacion de actualizar el ticket!*/
export default TicketPropsWithApollo