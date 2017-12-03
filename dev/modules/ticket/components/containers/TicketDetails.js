import { graphql } from 'react-apollo'
import TicketDetails from '../presentationals/details/TicketDetails'
import GetTicketDetailsAndMetadata from '../../graphql/querys/ticketDetails.graphql'

export default graphql(GetTicketDetailsAndMetadata, {
	options: ({routeParams: {number}}) => ({
		fetchResults: "network-only",
		variables: {number}
	}),
	props: ({data, ...rest}) => {
		let mapedInterventions;
		if(data.ticket){
			mapedInterventions = Array.from(data.ticket.interventions).map(intervention => {
				if(intervention.type_autor === "CLIENT")
					return({
						...intervention,
						autor: data.ticket.client
					})
				return intervention;
			})
		}
		
		return({
			...rest,
			data: {
				...data,
				ticket: {
					...data.ticket,
					interventions: mapedInterventions
				}
			}
		})
	}
})(TicketDetails)
