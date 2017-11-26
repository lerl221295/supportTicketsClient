import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './AgentFormContainer'
import createAgent from '../../graphql/mutations/createAgent.graphql'
import Agents from '../../graphql/querys/agents.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(createAgent, {
  props: ({ mutate }) => ({
    submit: (agent) => mutate({
    	variables: { agent },
    	refetchQueries: [ { query: Agents }]
    })
  })
})(formWithRedux);

