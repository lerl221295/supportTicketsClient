import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../components/clients/ModalForm'
import UpdateCliente from '../graphQL/mutations/updateCliente.graphql'
import Clientes from '../graphQL/querys/clients.graphql'

export default graphql(UpdateCliente, {
  props: ({ mutate }) => ({
    submit: (cliente) => mutate({ 
    	variables: { cliente },
    	refetchQueries: [ { query: Clientes }]
    })
  })
})(ModalForm)
