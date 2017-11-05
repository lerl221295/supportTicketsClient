import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../components/tecnicos/ModalForm'
import CreateTecnico from '../graphQL/mutations/createTecnico.graphql'
import Tecnicos from '../graphQL/querys/tecnicos.graphql'

export default graphql(CreateTecnico, {
  props: ({ mutate }) => ({
    submit: (tecnico) => mutate({ 
    	variables: { tecnico }, 
    	//update: (store, { data: { createTecnico } }) => {} //lo que deberia ser
    	refetchQueries: [ { query: Tecnicos }] //lo que es xD
    })
  })
})(ModalForm)

