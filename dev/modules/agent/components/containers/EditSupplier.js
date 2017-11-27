import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './SupplierFormContainer'
import UpdateSupplier from '../../graphql/mutations/updateSupplier.graphql'
import Suppliers from '../../graphql/querys/suppliers.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateSupplier, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		id,
		submit: (supplier) => mutate({
			variables: { supplier },
			update: (proxy, {data: {updateSupplier} }) => {
				/*sin el try catch esto se va a la puta x( (no entiendo aun porque)
				https://github.com/apollographql/apollo-supplier/issues/2051*/
				try {
					const data = proxy.readQuery({
						query: Suppliers
					});
					data.suppliers.nodes.map(supplier => {
						if(supplier.id !== updateSupplier.id) return supplier;
						return updateSupplier;
					});
					proxy.writeQuery({ query: Suppliers, data });
				}
				catch(e){
					//console.log(e);
				}
			}
		})
	})
})(formWithRedux)
