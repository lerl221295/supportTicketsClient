import { graphql } from 'react-apollo'
import GetMetadata from '../../graphql/querys/ticketMetadataToFilter.graphql'
import TicketsFilters from '../presentationals/TicketsFilters'

export default graphql(GetMetadata, {
	options: { fetchResults: "network-only" }
})(TicketsFilters)
