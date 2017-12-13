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
	],
	alerts: [
		{
			"type": "REMINDER",
			"motive": "RESPONSE",
			"time": 4,
			"message": "Exercitationem aut qui quas ipsum voluptas amet id modi. Mollitia vitae quod laborum rerum soluta. Eum enim explicabo nulla ut a. Natus commodi commodi distinctio quaerat iste. Dolores possimus non similique magni asperiores.",
			"to": [
				{
					"id": "ca4c1e5c-caff-42cb-b8d3-0db535dd7c87",
					"name": "Florencio"
				},
				{
					"id": "9ce46ded-4b8b-4195-90ec-18318c37d829",
					"name": "Ramon"
				},
				{
					"id": "3cd1898c-357c-4be3-9265-f039dfdec43c",
					"name": "Audra"
				},
				{
					"id": "55ea66d4-304b-421e-8fe8-3ce3584d56b7",
					"name": "Betsy"
				},
				{
					"id": "886cc9aa-c9e3-45ca-ba90-60537314433d",
					"name": "Doug"
				}
			]
		},
		{
			"type": "REMINDER",
			"motive": "RESOLUTION",
			"time": 4,
			"message": "Earum quis rerum tempora sed ipsum. Delectus numquam in voluptas repudiandae culpa. Expedita ut corporis ad officiis. Minima dignissimos ex sint blanditiis repudiandae quas. Labore consectetur porro voluptas.",
			"to": [
				{
					"id": "db95cc0f-cffb-4e0f-89ed-5f6111556737",
					"name": "Stone"
				},
				{
					"id": "9d311e77-7b7b-4063-8ba0-4030578da185",
					"name": "Wendy"
				},
				{
					"id": "3da32aca-9986-4b83-b93e-4553141ba781",
					"name": "Amaya"
				},
				{
					"id": "315ad411-1b19-42c3-9201-276b6b61e577",
					"name": "Dimitri"
				},
				{
					"id": "e59c8f1c-c431-46d1-ab2c-9a7e482ab15b",
					"name": "Jacquelyn"
				},
				{
					"id": "6c003bb6-4b91-424e-83a6-0a7197cff016",
					"name": "Jefferey"
				}
			]
		},
		{
			"type": "SLA_VIOLATION",
			"motive": "RESPONSE",
			"time": 4,
			"message": "Sit magni consectetur sunt eum sit quo ex cumque sit. Facere maxime sed dolores iusto quisquam. Possimus consectetur vitae eum mollitia reprehenderit autem ut nesciunt. Eius ut veniam nulla commodi porro accusamus eum autem sequi.",
			"to": [
				{
					"id": "b14f5cc7-f75f-4afc-b80a-263bb9d436bd",
					"name": "Ayana"
				}
			]
		},
		{
			"type": "SLA_VIOLATION",
			"motive": "RESOLUTION",
			"time": 4,
			"message": "Recusandae facere et distinctio. Illo cumque ullam tempora iure. Velit enim eligendi velit. Vero placeat ab aliquam eum. Quia consequatur qui unde aut rerum et molestias. Minus ratione voluptas qui iste nobis consequatur velit dolorem.",
			"to": [
				{
					"id": "4c2b4ea5-1b57-4a1d-afe5-7738d0b52a43",
					"name": "Verlie"
				}
			]
		}
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