import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/suppliers/ModalForm'
import createSupplier from '../../graphql/mutations/createSupplier.graphql'
import Suppliers from '../../graphql/querys/suppliers.graphql'

export default graphql(createSupplier, {
  props: ({ mutate }) => ({
    submit: (supplier) => mutate({
    	variables: { supplier },
    	refetchQueries: [ { query: Suppliers }]
    })
  })
})(ModalForm);

