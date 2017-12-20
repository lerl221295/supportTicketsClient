import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './ClientFormContainer'
import UpdateClient from '../../graphql/mutations/updateClient.graphql'
import Clients from '../../graphql/querys/clients.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateClient, {
	props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
		edit: id,
		submit: (client) => mutate({
			variables: { client },
			optimisticResponse: {
				__typename: 'Mutation',
				updateClient : {
					__typename: 'Client',
					...client,
					organization: {
						__typename: 'Organization',
						id: null,
						name: 'cargando'
					}
				}
			}
		})
	})
})(formWithRedux)
