import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './SupplierFormContainer'
import UpdateSupplier from '../../graphql/mutations/updateSupplier.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateSupplier, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		id,
		submit: (supplier) => mutate({
			variables: { supplier }
		})
	})
})(formWithRedux)
