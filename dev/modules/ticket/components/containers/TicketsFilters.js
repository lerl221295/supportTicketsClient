import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import GetMetadata from '../../graphql/querys/ticketMetadataToFilter.graphql'
import TicketsFilters from '../presentationals/TicketsFilters'

const TicketFiltersWithApollo = withApollo(props => {
	const searchData = (key, GraphqlQuery) => (search_text) => (
		props.client.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
		.then( ({data} ) => ({options: data[key].nodes}))
	);

	return(<TicketsFilters {...props} searchData={searchData}/>)
})

export default graphql(GetMetadata, {
	options: { fetchResults: "network-only" }
})(TicketFiltersWithApollo)

