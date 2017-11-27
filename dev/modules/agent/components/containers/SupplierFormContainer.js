import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Form from '../presentationals/suppliers/Form'

import GetAgents from '../../graphql/querys/agents.graphql'
import GetSupplier from '../../graphql/querys/supplier.graphql'

const initialState = {
	name: "",
	about: "",
	agents: []
};

@withApollo
class FormContainer extends Component {
	
	state = initialState;
	
	componentWillMount = async () => {
		//cuando el modal de edicion se presenta en pantalla
		if(this.props.id){ //si es el formulario en edicion
			let supplier = await this.props.client.query({
				query: GetSupplier,
				fetchPolicy: 'network-only',
				variables: {id: this.props.id}
			}).then(({ data }) => {
				let {__typename, ...supplier} = data.supplier;
				return supplier;
			});
			this.setState(supplier);
		}
	};
	
	cleanAndBack = () => {
        this.setState(initialState);
        this.props.goBack();
    };

    cancel = event => {
        event.preventDefault();
        this.cleanAndBack();
    };
	
	send = event => {
		event.preventDefault();
		
		let {agents, ...supplier} = this.state;
		// Mapeando grupo con atributos que espera el server
		if (agents.length) supplier.agents_id = agents.map(agent => agent.id);
		
		this.props.submit({...supplier, id: this.props.id})
			.then(() => {
				if(this.props.id) this.props.openAlert("Proveedor actualizado con éxito!");
				else this.props.openAlert("Proveedor guardado con éxito!");
				this.cleanAndBack();
			})
	};
	
	searchAgents = (search_text) => (
		this.props.client.query({
			query: GetAgents,
			variables: {search_text}
		})
		.then( ({data: {agents}}) => ({options: agents.nodes}) )
	);
	
	handleChange = e => this.setState({[e.target.name]: e.target.value});
	
	handleReactSelectChange = (name) => (selectValue) => this.setState({[name] : selectValue});
	
	render = () => (
    	<Form 
        	{...this.state}
            handleChange={this.handleChange}
            handleReactSelectChange={this.handleReactSelectChange}
            searchAgents={this.searchAgents}
            cancel={this.cancel}
            send={this.send}
        />
	)
}

export default FormContainer