import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './ClientFormContainer'
import UpdateClient from '../../graphql/mutations/updateClient.graphql'
import Clients from '../../graphql/querys/clients.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateClient, {
  props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
    edit: id,
    submit: (client) => mutate({ 
    	variables: { client },
    	//refetchQueries: ['GetClients'] //ya no te necesito xD
    	optimisticResponse: {
    		__typename: 'Mutation',
    		updateClient : {
    			__typename: 'Client',
    			...client,
                organization: {
                    __typename: 'Organization',
                    id: null,
                    name: 'cargando'
                }
    		}
    	},
    	update: (proxy, {data: {updateClient} }) => {
    		/*sin el try catch esto se va a la puta x( (no entiendo aun porque)
    		https://github.com/apollographql/apollo-client/issues/2051*/
		    try {
			    const data = proxy.readQuery({
				    query: Clients
			    });
			    data.clients.nodes.map(client => {
				    if(client.id !== updateClient.id) return client;
				    return updateClient;
			    });
			    proxy.writeQuery({ query: Clients, data });
		    }
    		catch(e){
    			//console.log(e);
    		}
    	}
    })    
  })
})(formWithRedux)
