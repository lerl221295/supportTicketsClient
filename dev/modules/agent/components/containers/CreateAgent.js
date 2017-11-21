import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/single/ModalForm'
import createAgent from '../../graphql/mutations/createAgent.graphql'
import Agents from '../../graphql/querys/agents.graphql'

export default graphql(createAgent, {
  props: ({ mutate }) => ({
    submit: (agent) => mutate({
    	variables: { agent },
    	refetchQueries: [ { query: Agents }]
    })
  })
})(ModalForm);

