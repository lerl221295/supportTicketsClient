import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Form from '../presentationals/Form'
import GetClient from '../../graphql/querys/slaPolicy.graphql'
import {reduxForm} from "redux-form";
import { PRIORITIES } from '../../../../common/utils/consts'

const SLAPoliciesWithReduxForm = reduxForm({ form: 'slaPolicies' })(Form);

const initialValues = {
	policies: [
		{
			priority: 'LOW'
		},
		{
			priority: 'MEDIUM'
		},
		{
			priority: 'HIGH'
		},
		{
			priority: 'URGENT'
		},
	]
};

@withApollo
class FormContainer extends Component {
	
	componentWillMount = () => {
		/*if (this.props.edit) { //si es el formulario en edicion
			var client = await this.props.client.query({
				query: GetClient,
				fetchPolicy: 'network-only',
				variables: { id: this.props.edit }
			}).then(response => {
				let { __typename, ...client } = response.data.client;
				return client;
			});
			this.setState({
				...client,
				phones: client.phones.join(', ')
			});
		}*/
	};
	
	searchData = (key, GraphqlQuery) => (search_text) => (
		this.props.client.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
			.then( ({data} ) => ({options: data[key].nodes}))
	);
	
	/*cleanAndBack = () => {
		this.setState(initialState);
		this.props.goBack();
	};*/
	
	/*cancel = event => {
		event.preventDefault();
		this.cleanAndBack();
	};
	
	send = event => {
		event.preventDefault();
		let client = this.state;
		client.phones = client.phones.replace(/\s/g, '').split(',');
		client.organization_id = client.organization.id;
		delete client.organization;
		delete client.avatar_filename;
		this.props.submit({ ...client, id: this.props.edit })
			.then(response => {
				if (this.props.edit) this.props.openAlert("Cliente actualizado con exito!");
				else this.props.openAlert("Cliente guardado con exito!");
				this.cleanAndBack();
				
			})
	};*/
	
	render = () => (
    <SLAPoliciesWithReduxForm
	    searchData={this.searchData}
	    initialValues={initialValues}
    />
	)
}

export default FormContainer