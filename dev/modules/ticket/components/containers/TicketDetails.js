import { graphql } from 'react-apollo'
import { compose } from 'redux'
import TicketDetails from '../presentationals/details/TicketDetails'
import GetTicketDetailsAndMetadata from '../../graphql/querys/ticketDetails.graphql'
import AddTask from '../../graphql/mutations/addTask.graphql'
import CheckTask from '../../graphql/mutations/checkTask.graphql'

const GetTicketsContainer = graphql(GetTicketDetailsAndMetadata, {
	options: ({routeParams: {number}}) => ({
		//fetchResults: "network-only",
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
});

const AddTaskContainer = graphql(AddTask, {
	props: ({mutate, ownProps}) => ({
		...ownProps,
		addTask: (text) => {
			mutate({
				variables: {text, ticket_number: ownProps.routeParams.number},
				update: (proxy) => {
					try {
					    let data = proxy.readQuery({
						    query: GetTicketDetailsAndMetadata,
						    variables: { number: ownProps.routeParams.number }
					    });
					    
					    data.ticket.tasks = [...data.ticket.tasks, {
					    	__typename: 'Task',
					    	text,
					    	done: false
					    }]
					    
						proxy.writeQuery({ 
					    	query: GetTicketDetailsAndMetadata, 
					    	variables: { number: ownProps.routeParams.number },
					    	data
					    });
				    }
		    		catch(e){
		    			console.log(e);
		    		}
				}
			})
		}
	})
})

const CheckTaskContainer = graphql(CheckTask, {
	props: ({mutate, ownProps}) => ({
		...ownProps,
		checkTask: (text) => {
			mutate({
				variables: {text, ticket_number: ownProps.routeParams.number},
				update: (proxy) => {
					try {
					    let data = proxy.readQuery({
						    query: GetTicketDetailsAndMetadata,
						    variables: { number: ownProps.routeParams.number }
					    });
					    
					    data.ticket.tasks = data.ticket.tasks.map(task => {
						    if(task.text !== text) return task;
						    return ({
						    	...task,
						    	done: !task.done
						    });
					    });

						proxy.writeQuery({ 
					    	query: GetTicketDetailsAndMetadata, 
					    	variables: { number: ownProps.routeParams.number },
					    	data
					    });
				    }
		    		catch(e){
		    			console.log(e);
		    		}
				} 
			})
		}
	})
})

export default compose(
	AddTaskContainer,
	CheckTaskContainer,
	GetTicketsContainer
)(TicketDetails)
