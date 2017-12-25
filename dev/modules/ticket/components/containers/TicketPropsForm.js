import React from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo, compose } from 'react-apollo'
import { reduxForm, getFormValues } from 'redux-form'
import diff from 'object-diff'
import _ from 'lodash'
import { openAlert } from '../../../../common/actions/alert'
import TicketPropsForm from '../presentationals/details/PropsForm'
import Ticket from '../../graphql/querys/ticketDetails.graphql'
import UpdateTicket from '../../graphql/mutations/updateTicket.graphql'
import GetAgentsNames from '../../graphql/querys/agentsNames.graphql'

const FormWithRedux = reduxForm({ 
		form: 'TicketDetailsForm',
		enableReinitialize: true
})(TicketPropsForm)

const getValueKey = (type) => do {
	if(
		type === "TEXT" || 
		type === "TEXTAREA" ||
		type === "DATE"
	) "text";
	else if(type === "NUMBER") "number";
	else if(type === "SELECT") "key";
	else if(type === "CHECKBOX") "check";
}

const getValue = (type, value) => do {
	if(type === "DATE") new Date(value.text);
	else value[getValueKey(type)];
};

const updateApolloCache = (ticketUpdate) => (proxy, {data: {updateTicket} }) => {
	try {
		const data = proxy.readQuery({ 
			query: Ticket,
			variables: { number: ticketUpdate.ticket_number }
		});
		
		//console.log("response", updateTicket);
		/*console.log("ticketUpdate", ticketUpdate);
		console.log("data", data);*/

		const { custom_fields, ...updated_ticket } = updateTicket;

		let new_custom_fields = data.ticketMetadata.custom_fields;
		if(ticketUpdate.custom_fields){
			new_custom_fields = data.ticketMetadata.custom_fields.map(field => {
				/*a partir de la data en cliente (no de la respuesta)*/
				const new_custom_field = ticketUpdate.custom_fields.find(({field_key}) => 
					( field_key === field.key ));

				if(!new_custom_field) return field;
				const valueKey = getValueKey(field.type);
				return({
					...field,
					value: {
						...field.value,
						[valueKey] : new_custom_field[valueKey] 
					}
				})
			});
		}
	    
	    let newData = {
	    	...data,
	    	ticket: {
	    		...data.ticket,
	    		...updated_ticket
	    	},
	    	ticketMetadata: {
	    		...data.ticketMetadata,
	    		custom_fields: new_custom_fields
	    	}
	    }

	    //console.log('new data', newData); 
	    proxy.writeQuery({ 
	    	query: Ticket,
	     	variables: { number: ticketUpdate.ticket_number },
	     	data: newData
	    });
	}
	catch(e){
		console.log(e);
	}
}

const TicketPropsWithApollo = withApollo((prop) => {
	
	let {
		client: apolloClient,
	 	mutate,
	 	ticket_number,
	 	openAlert,
	 	ticket,
	 	supplierForm,
	 	groupForm,
	 	...props
	} = prop;

	const searchData = (key, GraphqlQuery) => (search_text) => (
		apolloClient.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
		.then( ({data} ) => ({options: data[key].nodes}))
	);

	const searchAgents = (search_text) => (
		apolloClient.query({
			query: GetAgentsNames,
			variables: {
				search_text, 
				supliers: do {
					if(supplierForm) ([supplierForm]);
					else null;
				},
				groups: do {
					if(groupForm) ([groupForm]);
					else null;
				}
			}
		})
		.then( ({data} ) => ({options: data.agents.nodes}))
	);


	let initialValues = {
		state_key: ticket.state.key,
		priority: ticket.priority,
		type_key: ticket.type.key,
		source: ticket.source,
		agent: ticket.agent,
		group: ticket.group,
		supplier: ticket.supplier,
		device_id: ticket.device.id
	}

	if(props.custom_fields && props.custom_fields.length) 
		initialValues.custom = {};

	for(let {type, value, key} of props.custom_fields){
		initialValues.custom[key] = getValue(type, value);
	}

	const update = (values, arg2, {untouch}) => {
		const getNameAndId = ({name, id}) => ({ id, name });

		let {
			agent,
		 	supplier,
		 	group,
		 	custom,
		 	...vals
		} = values;

		let ticketUpdate = {
			ticket_number,
			...diff(initialValues, vals)
		}

		/*mapeo los custom values*/	
		const customDiffs = diff(initialValues.custom, custom)
		if(!_.isEmpty(customDiffs)){
			ticketUpdate.custom_fields = Object.keys(customDiffs).map(field_key => {
				const {type} = props.custom_fields.find(({key}) => (key === field_key));
				return({
					field_key,
					[getValueKey(type)] : customDiffs[field_key]
				})
			})
		}

		/*mapeo agent, suplier and group*/
		const currents = {agent, supplier, group};
		for(let key of ['agent', 'supplier', 'group']){
			if(initialValues[key].id !== currents[key].id)
				ticketUpdate[`${key}_id`] = currents[key].id;
		}

		mutate({
			variables: { ticketUpdate },
			update: updateApolloCache(ticketUpdate)
		}).then(response => openAlert("Ticket Actualizado Exitosamente"));
		
	}

	/*ordeno custom_fields*/
	let orderly = Array.from(props.custom_fields)
		.sort((a, b) => a.position - b.position);	

	return(
		<FormWithRedux 
			onSubmit={update}
			ticket={ticket} 
			{...props} 
			custom_fields={orderly}
			searchData={searchData}
			searchAgents={searchAgents}
			initialValues={initialValues}
		/>
	)
})

export default compose(
	connect( state => ({
		supplierForm: getFormValues('TicketDetailsForm')(state) && getFormValues('TicketDetailsForm')(state).supplier,
		groupForm: getFormValues('TicketDetailsForm')(state) && getFormValues('TicketDetailsForm')(state).group
	}), { openAlert }),
	graphql(UpdateTicket)
)(TicketPropsWithApollo)

