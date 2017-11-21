import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../../presentationals/agents/ModalForm'
import createAgent from '../../../graphQL/mutations/createAgent.graphql'
import Agents from '../../../graphQL/querys/agents.graphql'

export default graphql(createAgent, {
  props: ({ mutate }) => ({
    submit: (agent) => mutate({
    	variables: { agent },
    	refetchQueries: [ { query: Agents }]
    })
  })
})(ModalForm);

