import { connect } from 'react-redux' 
import { graphql, compose } from 'react-apollo'
import { reduxForm } from 'redux-form'
import GetEmail from '../../graphql/querys/emailSupport.graphql'
import UpdateEmail from '../../graphql/mutations/updateEmailSupport.graphql'
import EmailPanel from '../presentationals/Panel'
import { openAlert } from '../../../../common/actions/alert'

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Requerido'
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email Invalido'
    }
    if (!values.password) {
        errors.password = 'Requerido'
    } else if (!values.password_confirm) {
        errors.password_confirm = 'Requerido'
    } else if (values.password_confirm !== values.password) {
        errors.password_confirm = 'Las contraseñas no coinciden'
    }
    return errors
}

export default compose(
	connect(null, { openAlert }),
	graphql(GetEmail),
	graphql(UpdateEmail, {
		props: ({mutate, ownProps}) => ({
			onSubmit: (config) => {
				mutate({ 
					variables: { config },
					update: (proxy, {data: {updateEmailSupport} }) => {
						proxy.writeQuery({ query: GetEmail, data: {emailSupport: updateEmailSupport} });
					}
				})
				.then(response => ownProps.openAlert("Email Support Configurado Exitosamente"))
			} 
		})
	}),
	reduxForm({form: 'emailConfig', validate})
)(EmailPanel)