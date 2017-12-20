import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './AgentFormContainer'
import UpdateAgent from '../../graphql/mutations/updateAgent.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateAgent, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		id,
		submit: (agent) => mutate({
			variables: { agent },
			optimisticResponse: {
				__typename: 'Mutation',
				updateAgent : {
					__typename: 'Agent',
					...agent,
					name: `${agent.name} ${agent.lastname}`
				}
			}
		})
	})
})(formWithRedux)
