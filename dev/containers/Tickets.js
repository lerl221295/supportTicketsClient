import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import { graphql } from 'react-apollo'
import Tabs from '../components/tickets/TicketsTabs'
import Tickets from '../graphQL/querys/tickets.graphql'

/*const TicketsWithApollo = graphql(Tickets, {
	options : { variables: {onlyFirst: true} }
})(Tabs) */

export default connect((state) => ({search: state.search_text}), { push } )(Tabs)
