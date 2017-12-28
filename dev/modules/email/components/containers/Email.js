import { connect } from 'react-redux' 
import { graphql, compose } from 'react-apollo'
import { reduxForm } from 'redux-form'
import GetEmail from '../../graphql/querys/emailSupport.graphql'
import UpdateEmail from '../../graphql/mutations/updateEmailSupport.graphql'
import EmailPanel from '../presentationals/Panel'
import { openAlert } from '../../../../common/actions/alert'

export default compose(
	connect(null, { openAlert }),
	graphql(GetEmail),
	graphql(UpdateEmail, {
		props: ({mutate, ownProps}) => ({
			onSubmit: (config) => {
				mutate({ 
					variables: { config },
					update: (proxy, {data: {updateEmailSupport} }) => {
						proxy.writeQuery({ query: GetEmail, data: {emailSupport: config.email} });
					}
				})
				.then(response => ownProps.openAlert("Email Support Configurado Exitosamente"))
			} 
		})
	}),
	reduxForm({form: 'emailConfig'})
)(EmailPanel)