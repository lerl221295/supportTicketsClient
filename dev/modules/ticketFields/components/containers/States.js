import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
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
	{ deleteState, openAlert, openModal, closeModal }
);

const ApolloContainer = graphql(UpdateTicketStates, {
	props: ({ownProps: {states, openAlert, ...rest}, mutate}) => ({
		states,
		rest,
		update: () => 
			mutate({ variables: { states }/*, update: updateApolloCache(states)*/ })
				.then(response => openAlert("Estados Actualizados Exitosamente"))	
	})
});

const updateApolloCache = states => (proxy, {data: {updateTicketStates} }) => {
	try {
		const data = proxy.readQuery({ query: TicketMetadata });

		data.ticketMetadata.types = types.map(type => ({
			...type,
			__typename: 'TicketType'
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