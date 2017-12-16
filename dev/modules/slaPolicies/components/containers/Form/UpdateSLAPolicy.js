// React Apollo
import { graphql, compose } from 'react-apollo'
//React Redux
import { connect } from 'react-redux'
// React Router Redux
import { goBack, push } from 'react-router-redux'
// Redux Actions
import { openAlert } from '../../../../../common/actions/alert'
// Containers Components
import FormContainer from './SLAFormContainer'
// Graphql Mutations
import { UpdateSLAPolicy } from '../../../graphql/mutations'
// Graphql Querys
import { GetSLAPolicies } from '../../../graphql/querys'

export default compose(
	connect(null, { goBack, openAlert, push }),
	graphql(UpdateSLAPolicy, {
		props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
			id,
			submit: (slapolicy) => mutate({
				variables: { slapolicy },
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
	})
)(FormContainer);