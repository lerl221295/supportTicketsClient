import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './SupplierFormContainer'
import createSupplier from '../../graphql/mutations/createSupplier.graphql'
import Suppliers from '../../graphql/querys/suppliers.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(createSupplier, {
  props: ({ mutate }) => ({
    submit: (supplier) => mutate({
    	variables: { supplier },
    	refetchQueries: [ { query: Suppliers }]
    })
  })
})(formWithRedux);

