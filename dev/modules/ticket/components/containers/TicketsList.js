import { connect } from 'react-redux'
import { graphql } from "react-apollo"
import GetTickets from '../../graphql/querys/tickets.graphql'
import MoreTickets from '../../graphql/subscriptions/newTickets.graphql'
import TicketList from '../presentationals/TicketsList'
import _ from 'lodash'

const limit = 10;
const TicketWithApolloData = graphql(GetTickets, {
	options: ({filter_form}) => ({
		variables: {
			filter: filter_form,
			limit
		},
		notifyOnNetworkStatusChange: true
	}),
	props: ({ ownProps, data: { fetchMore, refetch, subscribeToMore, tickets, loading, error } }) => {
		// console.log("tickets",tickets)
		let ticketsArray;
		if(tickets) ticketsArray = tickets.nodes;
		return({
			...ownProps,
			tickets: ticketsArray,
			loading,
			error,
			refetchTickets: () => refetch({ limit, filter: ownProps.filter_form }),
			loadMoreTickets: () => fetchMore({
				variables: {
					limit,
					offset: ticketsArray.length
				},
				updateQuery: (previousResult, { fetchMoreResult }) => {
					if (!fetchMoreResult) return previousResult;
					return Object.assign({}, previousResult, {
						tickets: {
							__typename: "TicketsResponse",
							nodes: [...previousResult.tickets.nodes, ...fetchMoreResult.tickets.nodes]
						}
					});
				}
			}),
			subscribeToNewTickets: (filter) => subscribeToMore({
				document: MoreTickets,
				variables: { filter },
				updateQuery: (prev, {subscriptionData}) => {
					if (!subscriptionData.newTicket) return prev;
					
					const { newTicket } = subscriptionData;
					
					return Object.assign({}, prev, {
						tickets: {
							__typename: "TicketsResponse",
							nodes: [newTicket ,...prev.tickets.nodes]
						}
					});
				}
			})
		})
	}
})(TicketList)

/*Considerar crear otro componente intermediario, el cual sera wrapeado por TicketWithFilters para obtener
* todos los campos del formulario de filtrado, pero pasarlos a TicketWithApolloData como props solo cuando se
* desea hacer refetch de los tickets en base al nuevo estado del form (y no siempre como funciona ahorita)*/

const mapStateToProps = ({form: {FilterForm: {values}}}) => {
	if(values){
		let filterMapedObject = {};
		const keysForMap = ["agents", "clients", "organizations", "suppliers", "groups"];
		for(let key of keysForMap){
			if(values[key] && values[key].length) filterMapedObject[key] = values[key].map(ob => ob.id);
		}
		const keysForValidatedEmpty = ["priorities", "types_keys", "states_keys", "due_by"];
		for(let key of keysForValidatedEmpty){
			if(values[key] && values[key].length) filterMapedObject[key] = values[key];
		}
		if(_.isEmpty(filterMapedObject)) return undefined;
		return({
			filter_form: {
				...filterMapedObject
			}
		});
	}
	return({filter_form: values})
};
const TicketWithFilters = connect(mapStateToProps)(TicketWithApolloData);

export default TicketWithFilters