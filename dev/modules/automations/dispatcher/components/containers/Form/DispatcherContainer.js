import React, { Component } from 'react'
// React Apollo
import { withApollo, graphql, compose } from 'react-apollo'
// Presentationals Components
import Form from '../../presentationals/Form/Form'
// Graphql Querys
import { GetDispatcher, GetTicketFields, GetAgentsNames, GetGroupsNames, GetSuppliersNames, GetClientsNames } from '../../../graphql/querys'
// ReduxForm
import { reduxForm } from 'redux-form'

const querys = {
	agent: GetAgentsNames,
	client: GetClientsNames,
	group: GetGroupsNames,
	supplier: GetSuppliersNames,
};

const DispatcherWithReduxForm = compose (
	graphql(GetTicketFields, { name: 'TicketFieldsMetadata' }),
	reduxForm({ form: 'slaPolicies', enableReinitialize: true  })
)(Form);

@withApollo
export default class FormContainer extends Component {
	state = {};
	
	componentWillMount = () => {
		let { id, client } = this.props;
		if (id) {
			client.query({
				query: GetDispatcher,
				fetchPolicy: 'network-only',
				variables: { id }
			}).then(({data: {dispatcher: {__typename, conditions, actions, ...dispatcher}}}) => {
				this.setState({
					initialValues: {
						...dispatcher,
						conditions: conditions.map(condition => {
							const {conditioned_field: {key, type}, values} = condition;
							if (type === 'SELECT') {
									return ({
										...condition,
										values: do {
											if (['agent', 'client', 'supplier', 'group'].includes(key))
												values.map(({key, label}) => ({id: key, name: label}));
											else values.map(({key}) => key);
										}
									});
							}
							return condition;
						}),
						actions: actions.map(action => {
							const {__typename} = action;
							if (__typename === 'ActionEmail')
								return({
									...action,
									field: {
										key: 'send_email'
									}
								});
							return action;
						})
					}});
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
	
	searchData = (key) => (search_text) => {
		return (
			this.props.client.query({
				query: querys[key],
				variables: {search_text}
			}).then( ({data} ) => ({options: data.entity.nodes }))
		);
	};
	
	render = () => {
		return (
			<DispatcherWithReduxForm
				searchData={this.searchData}
				initialValues={this.state.initialValues}
				onSubmit={this.send}
				goBack={this.props.goBack}
			/>
		)
	}
}