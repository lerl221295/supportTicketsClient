import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './GroupFormContainer'
import UpdateGroup from '../../graphql/mutations/updateGroup.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateGroup, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		id,
		submit: (group) => mutate({
			variables: { group }
		})
	})
})(formWithRedux)
