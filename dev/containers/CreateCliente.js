import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../components/clients/ModalForm'
import createCliente from '../graphQL/mutations/createCliente.graphql'
import Clientes from '../graphQL/querys/clientes.graphql'

export default graphql(createCliente, {
  props: ({ mutate }) => ({
    submit: (cliente) => mutate({ 
    	variables: { cliente },
    	refetchQueries: [ { query: Clientes }]
    })
  })
})(ModalForm)

