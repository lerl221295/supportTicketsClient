import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './AgentFormContainer'
import UpdateAgent from '../../graphql/mutations/updateAgent.graphql'
import Agents from '../../graphql/querys/agents.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateAgent, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		id,
		submit: (agent) => mutate({
			variables: { agent },
			//refetchQueries: ['GetAgents'] //ya no te necesito xD
			optimisticResponse: {
				__typename: 'Mutation',
				updateAgent : {
					__typename: 'Agent',
					...agent,
					name: `${agent.name} ${agent.lastname}`
				}
			},
			update: (proxy, {data: {updateAgent} }) => {
				/*sin el try catch esto se va a la puta x( (no entiendo aun porque)
				https://github.com/apollographql/apollo-agent/issues/2051*/
				try {
					const data = proxy.readQuery({
						query: Agents
					});
					data.agents.nodes.map(agent => {
						if(agent.id !== updateAgent.id) return agent;
						console.log("enontrado", agent);
						return updateAgent;
					});
					proxy.writeQuery({ query: Agents, data });
				}
				catch(e){
					//console.log(e);
				}
			}
		})
	})
})(formWithRedux)
