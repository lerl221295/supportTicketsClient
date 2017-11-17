import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../components/clients/ModalForm'
import UpdateClient from '../graphQL/mutations/updateClient.graphql'
import Clients from '../graphQL/querys/clients.graphql'

export default graphql(UpdateClient, {
  props: ({ mutate, ownProps: {limit} }) => ({
    submit: (client) => mutate({ 
    	variables: { client },
    	//refetchQueries: ['GetClients']
    	update: (proxy, {data: {updateClient} }) => {
    		const data = proxy.readQuery({ 
    			query: Clients, 
    			// tengo que pasar las variables porque si no no funciona :(
    			variables: {search_text: null, offset: null, limit}
    		});
    		data.clients.nodes.map(client => {
    			if(client.id !== updateClient.id) return client;
    			return updateClient;
    		});
    		proxy.writeQuery({ query: Clients, data });
    	}
    })
  })
})(ModalForm)
