import React, { Component } from 'react'
// React Apollo
import { withApollo } from 'react-apollo'
// Presentationals Components
import Form from '../../presentationals/Form/Form'
// Graphql Querys
import { GetSLAPolicy } from '../../../graphql/querys'
// ReduxForm
import { reduxForm } from 'redux-form'

const SLAPoliciesWithReduxForm = reduxForm({ form: 'slaPolicies', enableReinitialize: true  })(Form);

@withApollo
export default class FormContainer extends Component {
	state = {};
	
	componentWillMount = () => {
		let { id, client } = this.props;
		if (id) {
			client.query({
				query: GetSLAPolicy,
				fetchPolicy: 'network-only',
				variables: { id }
			}).then(response => {
				let { __typename, by_default, ...SLAPolicy } = response.data.SLAPolicy;
				SLAPolicy.alerts = SLAPolicy.alerts.map(({__typename, ...alert}) => alert);
				SLAPolicy.policies = SLAPolicy.policies.map(({__typename, ...policy}) => {
					let { __typename: typename_first_response, ...first_response } = policy.first_response;
					let { __typename: typename_solved, ...solved } = policy.solved;
					return ({...policy, first_response, solved})
				});
				this.setState({initialValues: {...SLAPolicy}});
			});
		}
	};
	
	send = slapolicy => {
		const {id, openAlert, push } = this.props;
		if (slapolicy.clients && slapolicy.clients.length)
			slapolicy.clients = slapolicy.clients.map(client => client.id);
		if (slapolicy.organizations && slapolicy.organizations.length)
			slapolicy.organizations = slapolicy.organizations.map(organization => organization.id);
		if (slapolicy.alerts && slapolicy.alerts.length)
			slapolicy.alerts = slapolicy.alerts.map(alert => ({...alert, to: alert.to.map(agent => agent.id)}));
		this.props.submit({ ...slapolicy, id: this.props.id })
			.then(() => {
				if (id) openAlert("Política SLA actualizada con éxito!");
				else openAlert("Política SLA creada con éxito!");
				push('/admin/sla');
			})
	};
	
	searchData = (key, GraphqlQuery) => (search_text) => (
		this.props.client.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
			.then( ({data} ) => ({options: data[key].nodes}))
	);
	
	render = () => {
		return (
			<SLAPoliciesWithReduxForm
				searchData={this.searchData}
				initialValues={this.state.initialValues}
				onSubmit={this.send}
				goBack={this.props.goBack}
			/>
		)
	}
}