import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { toast } from 'react-toastify'
import { withApollo } from 'react-apollo'
import GetAgent from '../../../graphQL/querys/agent.graphql'
import GetSuppliersNames from '../../../graphQL/querys/suppliersNames.graphql'

const initialState = {
	name: "",
	lastname: "",
	role: "",
	sex: "",
	email: "",
	phones: "",
	about: "",
	profession: "",
	face_base64: null,
	avatar_filename: "Seleccione una imagen ...",
	groups_id: [],
	supplier_id: null
};

const customContentStyle = {
	height: '95%',
	maxHeight: 'none',
};

@withApollo
class ModalForm extends Component {
	
	componentWillMount () {
		this.setState(initialState);
	}
	
	componentWillReceiveProps = async (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		if(nextProps.edit && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			var agent = await nextProps.client.query({
				query: GetAgent,
				fetchPolicy: 'network-only',
				variables: {id: nextProps.edit}
			}).then(({ data }) => {
				//le quito el __typename para que la mutacion posterior funcione bien
				let {__typename, ...agent} = data.agent;
				delete agent.supplier;//no pude sacarlo con el destructuring :c
				agent.supplier_id = data.agent.supplier.id;
				return agent;
			});
			this.setState({
				...agent,
				phones: agent.phones.join(', ')
			});
		}
	};
	
	cleanForm = () => this.setState(initialState);
	
	enviar = event => {
		event.preventDefault();
		let agent = this.state;
		agent.phones = agent.phones.replace(/\s/g, '').split(',');
		if (agent.groups) {
			agent.groups_id = agent.groups.map(group => group.id);
			delete agent.groups;
		}
		else delete agent.groups_id;
		if (!agent.supplier_id) {
			delete agent.supplier_id;
		}
		delete agent.avatar_filename;
		if(!this.props.edit) console.log("creando agente", agent);
		else console.log("actualizando agente", agent);
		this.props.close();
		this.props.submit({...agent, id: this.props.edit})
			.then(response => {
				//if(!this.props.edit) toast.success(response.data.createCliente);
				//else toast.success(response.data.updateCliente);
				if(this.props.edit) this.props.notificate("Cliente actualizado con exito!");
				else this.props.notificate("Cliente guardado con exito!");
				this.setState(initialState);
			})
	};
	
	changeImage = ({target: { files: [file] } }) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => this.setState({face_base64: reader.result, avatar_filename: file.name});
	}
	
	searchSuppliers = (search_text) => {
		return (
			this.props.client.query({
				query: GetSuppliersNames,
				variables: {search_text}
			}).then( ({data: {suppliers}} ) => {
				//console.log(suppliers.nodes);
				return suppliers.nodes.map(supplier => ({
					label: supplier.name,
					value: supplier.id
				}))
			})
				.then(options => {
					console.log("cargando estas opciones",options);
					return {options}
				})
		)
	};
	
	changeSupplier = (supplier) => {
		console.log(supplier)
		if(supplier)
			this.setState({supplier_id: supplier.value})
		else
			this.setState({supplier_id: null});
	};
	
	handleChange = e =>  this.setState({[e.target.name]: e.target.value});
	
	handleSelectChange = (name) => (e, i, value) => this.setState({[name] : value});
	
	render = () => (
    <div>
      <Dialog
        title={this.props.title}
        titleStyle={{textAlign: "center"}}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
        contentStyle={customContentStyle}
      >
        <Form {...this.state}
              id={this.props.edit}
              close={this.props.close}
              handleChange={this.handleChange}
              handleSelectChange={this.handleSelectChange}
              clean={this.cleanForm}
              enviar={this.enviar}
              changeImage={this.changeImage}
              changeSupplier={this.changeSupplier}
              searchSuppliers={this.searchSuppliers}
        />
      </Dialog>
    </div>
	)
}

export default ModalForm