import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/single/ModalForm'
import UpdateAgent from '../../graphql/mutations/updateAgent.graphql'
import Agents from '../../graphql/querys/agents.graphql'

export default graphql(UpdateAgent, {
	props: ({ mutate, ownProps: {limit} }) => ({
		submit: (agent) => mutate({
			variables: { agent },
			//refetchQueries: ['GetAgents'] //ya no te necesito xD
			optimisticResponse: {
				__typename: 'Mutation',
				updateAgent : {
					__typename: 'Agent',
					...agent
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
})(ModalForm)
