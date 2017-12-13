import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { deleteType } from '../../actions/types'
import TicketMetadata from '../../graphql/querys/ticketMetadata.graphql'
import UpdateTicketTypes from '../../graphql/mutations/updateTicketTypes.graphql'
import Types from '../presentationals/types/Types' 
import { openAlert } from '../../../../common/actions/alert'

const ReduxContainer = connect(
	({ticketFields: {types} }) => ({types}),
	{ deleteType, openAlert }
);

const ApolloContainer = graphql(UpdateTicketTypes, {
	props: ({ownProps: {types, openAlert, ...rest}, mutate}) => ({
		types,
		rest,
		update: () => 
			mutate({ variables: { types }, update: updateApolloCache(types) })
				.then(response => openAlert("Tipos Actualizados Exitosamente"))	
	})
});

const updateApolloCache = types => (proxy, {data: {updateTicketTypes} }) => {
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
)(Types)