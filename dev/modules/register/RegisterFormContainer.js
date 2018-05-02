import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import RegisterTenant from './registerTenant.graphql'
import { toast } from 'react-toastify'
import config from '../../config'
import {reduxForm} from "redux-form";
import Form from "./Form";

const RegisterTenantWithReduxForm = reduxForm({ form: 'register' })(Form);

@connect(null, { push })
@graphql(RegisterTenant)
class RegisterFormContainer extends Component {

	send = (tenant) => {
		this.props.mutate({
			variables: { tenant }
		}).then( ({data: {registerTenant: {subdomain}}}) => {
			toast.success("Tenant creado exitosamente");
			window.location.href = `http://${subdomain}.${config.HOST}`
		}).catch( (error) => {
			console.log(error)
		})
	};

	render = () => {
		return (
			<RegisterTenantWithReduxForm
				onSubmit={this.send}
			/>
		)
	}
}

export default RegisterFormContainer;
