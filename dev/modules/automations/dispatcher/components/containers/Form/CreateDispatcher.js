import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack, push } from 'react-router-redux'
import { openAlert } from '../../../../../../common/actions/alert'
import FormContainer from './DispatcherContainer'
import { CreateDispatcher } from '../../../graphql/mutations'
import { GetDispatchers } from '../../../graphql/querys'

const formWithRedux = connect(null, { goBack, openAlert, push })(FormContainer);

export default graphql(CreateDispatcher, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		id,
		submit: (slapolicy) => mutate({
			variables: { slapolicy },
			/*optimisticResponse: {
				__typename: 'Mutation',
				updateAgent : {
					__typename: 'Agent',
					...slapolicy,
					name: `${slapolicy.name} ${slapolicy.lastname}`
				}
			},*/
			update: (proxy, {data: {createSLAPolicy} }) => {
				try {
					const data = proxy.readQuery({
						query: GetDispatchers
					});
					data.SLAPolicies.unshift(createSLAPolicy);
					data.SLAPolicies = data.SLAPolicies.map( (policy, i) => ({...policy, position: i}));
					proxy.writeQuery({ query: GetDispatchers, data });
				}
				catch(e){
					//console.log(e);
				}
			}
		})
	})
})(formWithRedux);