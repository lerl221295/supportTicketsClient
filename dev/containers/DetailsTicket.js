import { connect } from 'react-redux'
//import {push} from 'react-router-redux'
import { graphql } from 'react-apollo'
import Detail from '../components/tickets/Details'
import Ticket from '../graphQL/querys/ticket.graphql'
import asignTecnico from '../graphQL/mutations/asignTecnico.graphql'

const TicketWithData = graphql(Ticket, {
	//props : ({ data, ownProps: { routeParams: {id} } }) =>  ({ data, id }),
	options: ({ routeParams: {id} }) => ({ variables: { id }, fetchPolicy: 'network-only' })
})(Detail)

export default TicketWithData