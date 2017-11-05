import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../components/tecnicos/ModalForm'
import UpdateTecnico from '../graphQL/mutations/updateTecnico.graphql'
import Tecnicos from '../graphQL/querys/tecnicos.graphql'

export default graphql(UpdateTecnico, {
  props: ({ mutate }) => ({
    submit: (tecnico) => mutate({ 
    	variables: { tecnico },
    	refetchQueries: [ { query: Tecnicos }]
    })
  })
})(ModalForm)
