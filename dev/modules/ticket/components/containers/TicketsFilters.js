import { graphql } from 'react-apollo'
import GetMetadata from '../../graphql/querys/ticketMetadata.graphql'
import TicketsFilters from '../presentationals/TicketsFilters'

export default graphql(GetMetadata)(TicketsFilters)
