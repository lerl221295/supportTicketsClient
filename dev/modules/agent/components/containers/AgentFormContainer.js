import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Form from '../presentationals/single/Form'

import GetAgent from '../../graphql/querys/agent.graphql'
import GetSuppliersNames from '../../graphql/querys/suppliersNames.graphql'
import GetGroupsNames from '../../graphql/querys/groupsNames.graphql'

const initialState = {
	name: "",
	lastname: "",
	role: "",
	sex: "",
	email: "",
	phones: "",
	about: "",
	profession: "",
	face_base64: "",
	avatar_filename: "Seleccione una imagen ...",
	groups: [],
	supplier: null
};

@withApollo
class FormContainer extends Component {
	
	state = initialState;
	
	componentWillMount = async () => {
		if(this.props.id){ //si es el formulario en edicion
			let agent = await this.props.client.query({
				query: GetAgent,
				fetchPolicy: 'network-only',
				variables: {id: this.props.id}
			}).then(({ data }) => {
				let {__typename, ...agent} = data.agent;
				return agent;
			});
			this.setState({
				...agent,
				phones: agent.phones.join('; ')
			});
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
		
		let {groups, supplier, ...agent} = this.state;
		// Mapeando grupo con atributos que espera el server
		if (groups.length) agent.groups_id = groups.map(group => group.id);
		if (supplier) agent.supplier_id = supplier.id;
		// Los teléfonos van en un array
		agent.phones = agent.phones.replace(/\s/g, '').split(';');
		// El filename se elimina siempre
		delete agent.avatar_filename;
		
		this.props.submit({...agent, id: this.props.id})
			.then(response => {
				if(this.props.id) this.props.openAlert("Agente actualizado con éxito!");
				else this.props.openAlert("Agente guardado con éxito!");
				this.cleanAndBack();
			})
	};
	
	changeImage = ({target: { files: [file] } }) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => this.setState({face_base64: reader.result, avatar_filename: file.name});
	};
	
	searchEntity = (Query, entity) => (search_text) => (
		this.props.client.query({
			query: Query,
			variables: {search_text}
		})
		.then( ({data}) => ({options: data[entity].nodes}))
	);
	
	handleChange = e => this.setState({[e.target.name]: e.target.value});
	
	handleSelectChange = (name) => (e, i, value) => this.setState({[name] : value});
	
	handleReactSelectChange = (name) => (selectValue) => this.setState({[name] : selectValue});
	
	render = () => (
	    <Form 
        	{...this.state}
            handleChange={this.handleChange}
            handleSelectChange={this.handleSelectChange}
            handleReactSelectChange={this.handleReactSelectChange}
            changeImage={this.changeImage}
            searchSuppliers={this.searchEntity(GetSuppliersNames, 'suppliers')}
            searchGroups={this.searchEntity(GetGroupsNames, 'groups')}
            send={this.send}
      		cancel={this.cancel}
        />
	)
}

export default FormContainer