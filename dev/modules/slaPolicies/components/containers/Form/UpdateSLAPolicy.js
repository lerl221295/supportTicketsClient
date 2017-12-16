import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack, push } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './SLAFormContainer'
import UpdateSLAPolicy from '../../graphql/mutations/updateSLAPolicy.graphql'
import GetSLAPolicies from '../../graphql/querys/slaPolicies.graphql'

const formWithRedux = connect(null, { goBack, openAlert, push })(FormContainer);

export default graphql(UpdateSLAPolicy, {
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
			update: (proxy, {data: {updateSLAPolicy} }) => {
				try {
					const data = proxy.readQuery({
						query: GetSLAPolicies
					});
					data.SLAPolicies.map(SLAPolicy => {
						if(SLAPolicy.id !== updateSLAPolicy.id) return SLAPolicy;
						return updateSLAPolicy;
					});
					proxy.writeQuery({ query: GetSLAPolicies, data });
				}
				catch(e){
					//console.log(e);
				}
			}
		})
	})
})(formWithRedux);