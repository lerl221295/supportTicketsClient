import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getFormValues } from 'redux-form'
import { graphql, withApollo, compose } from 'react-apollo'
import GetMetadata from '../../graphql/querys/ticketMetadataToFilter.graphql'
import TicketsFilters from '../presentationals/TicketsFilters'

const TicketFiltersWithApollo = Component => withApollo(props => {
	const searchData = (key, GraphqlQuery) => (search_text) => (
		props.client.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
		.then( ({data} ) => ({options: data[key].nodes}))
	);
	return(<Component {...props} searchData={searchData}/>)
});

const TicketInizializated = Component => ({criteria, ...rest}) => {
	if(_.isEmpty(criteria)) return <Component {...rest}/>;

	let initialValues = {};
	if("unassigned" in criteria) initialValues.unassigned = true;
	if(criteria.due_by) initialValues.due_by = [criteria.due_by];
	if(criteria.state){
		if(criteria.state === "new") initialValues.states_keys = ["new"];
		if(criteria.state === "unresolved"){
			if(rest.data.ticketMetadata){
				initialValues.states_keys = 
					rest.data.ticketMetadata.ticketStatus.filter(({key}) => key !== "resolved")
					.map(({key}) => key)
			}
		}
		else if(criteria.state === "pending"){
			if(rest.data.ticketMetadata){
				initialValues.states_keys = 
					rest.data.ticketMetadata.ticketStatus.filter(({sla_paused}) => sla_paused)
					.map(({key}) => key)
			}
		}
	}
	
	return(<Component {...rest} initialValues={initialValues}/>)
} 

export default compose(
	graphql(GetMetadata, {
		options: { fetchResults: "network-only" }
	}),
	TicketFiltersWithApollo,
	TicketInizializated,
	connect(state => ({unassigned: getFormValues('FilterForm')(state) && getFormValues('FilterForm')(state).unassigned}))
)(TicketsFilters)

