import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../../presentationals/clients/single/ModalForm'
import createClient from '../../../graphQL/mutations/createClient.graphql'
import Clients from '../../../graphQL/querys/clients.graphql'

export default graphql(createClient, {
  props: ({ mutate }) => ({
    submit: (client) => mutate({ 
    	variables: { client },
    	refetchQueries: [ { query: Clients }]
    })
  })
})(ModalForm);

