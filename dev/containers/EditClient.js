import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../components/clients/ModalForm'
import UpdateClient from '../graphQL/mutations/updateClient.graphql'
import Clients from '../graphQL/querys/clients.graphql'

export default graphql(UpdateClient, {
  props: ({ mutate, ownProps: {limit} }) => ({
    submit: (client) => mutate({ 
    	variables: { client },
    	//refetchQueries: ['GetClients'] //ya no te necesito xD
    	optimisticResponse: {
    		__typename: 'Mutation',
    		updateClient : {
    			__typename: 'Client',
    			...client
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
})(ModalForm)
