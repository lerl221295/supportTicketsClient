import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './GroupFormContainer'
import UpdateGroup from '../../graphql/mutations/updateGroup.graphql'
import Groups from '../../graphql/querys/groups.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateGroup, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		id,
		submit: (group) => mutate({
			variables: { group },
			update: (proxy, {data: {updateGroup} }) => {
				/*sin el try catch esto se va a la puta x( (no entiendo aun porque)
				https://github.com/apollographql/apollo-group/issues/2051*/
				try {
					const data = proxy.readQuery({
						query: Groups
					});
					data.groups.nodes.map(group => {
						if(group.id !== updateGroup.id) return group;
						return updateGroup;
					});
					proxy.writeQuery({ query: Groups, data });
				}
				catch(e){
					//console.log(e);
				}
			}
		})
	})
})(formWithRedux)
