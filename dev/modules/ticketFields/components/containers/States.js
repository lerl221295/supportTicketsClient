import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { goBack } from 'react-router-redux'
import { deleteState, openModal, closeModal } from '../../actions/states'
import TicketMetadata from '../../graphql/querys/ticketMetadata.graphql'
import UpdateTicketStates from '../../graphql/mutations/updateTicketStates.graphql'
import States from '../presentationals/states/States'
import { openAlert } from '../../../../common/actions/alert'

const ReduxContainer = connect(
	({ticketFields: {states} }) => ({
		states: states.nodes, 
		modal: states.modal
	}),
	{ deleteState, openAlert, openModal, closeModal, goBack }
);

const ApolloContainer = graphql(UpdateTicketStates, {
	props: ({ownProps: {states, openAlert, ...rest}, mutate}) => ({
		states,
		rest,
		update: () => {
			/*validacion de estados vagos*/
			for(let state of states){
				if(state.key !== "new" && (!state.came_from || !state.came_from.length)){
					openAlert("Error: Todos los estados deben provenir de al menos un estado");
					return;
				}
				
				if(state.stage !== "END"){
					const go_anywhere = states.find(state_go => {
						if(!state_go.came_from) return false;
						return (state_go.came_from.map(({key}) => key).includes(state.key))
					});
					if(!go_anywhere){
						openAlert("Error: Todos los estados no finales, deben llevar a al menos un estado");
						return;
					}
				}
			}

			const new_states = Array.from(states).map(({came_from, ...state}) => ({
				...state, 
				came_from: do {
					if(came_from) came_from.map(({key}) => key);
					else null;
				}
			}))
			mutate({ variables: { states: new_states }, update: updateApolloCache(new_states) })
				.then(response => openAlert("Estados Actualizados Exitosamente"))		
		}
	})
});

const updateApolloCache = states => (proxy, {data: {updateTicketStates} }) => {
	try {
		const data = proxy.readQuery({ query: TicketMetadata });

		data.ticketMetadata.states = states.map(({came_from, ...state}) => ({
			__typename: 'State',
			...state,
			came_from: do {
				if(came_from) came_from.map(key_from => {
					const came = states.find(({key}) => key === key_from);
					return({
						label: came.label,
						key: came.key,
						__typename: 'State'
					})
				});
				else null
			}
		}));
	    
	    proxy.writeQuery({ query: TicketMetadata, data});
	}
	catch(e){
		console.log(e);
	}
}

export default compose(
	ReduxContainer,
	ApolloContainer
)(States)