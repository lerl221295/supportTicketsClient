import { graphql } from 'react-apollo'
import TicketDetails from '../presentationals/details/TicketDetails'
import GetTicketDetailsAndMetadata from '../../graphql/querys/ticketDetails.graphql'

export default graphql(GetTicketDetailsAndMetadata, {
	options: ({routeParams: {number}}) => ({
		fetchResults: "network-only",
		variables: {number}
	})
})(TicketDetails)
