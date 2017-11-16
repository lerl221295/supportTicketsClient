import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../components/clients/ModalForm'
import UpdateClient from '../graphQL/mutations/updateClient.graphql'
import Clients from '../graphQL/querys/clients.graphql'

export default graphql(UpdateClient, {
  props: ({ mutate }) => ({
    submit: (client) => mutate({ 
    	variables: { client },
    	refetchQueries: [ { query: Clients }]
    })
  })
})(ModalForm)
