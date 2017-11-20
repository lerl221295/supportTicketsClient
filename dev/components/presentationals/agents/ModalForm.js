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
	group: "",
	supplier_id: null
};

@withApollo
class ModalForm extends Component {
	
	componentWillReceiveProps = async (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		console.log("nuevas props ... ", nextProps)
		if(nextProps.edit && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			var agent = await nextProps.client.query({
				query: GetAgent,
				fetchPolicy: 'network-only',
				variables: {id: nextProps.edit}
			}).then(({ data }) => {
				console.log("la data---", data);
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
		let client = this.state;
		client.phones = client.phones.replace(/\s/g, '').split(',');
		if(!this.props.edit) console.log("creando cliente", client);
		else console.log("actualizando cliente", client);
		this.props.close();
		this.props.submit({...client, id: this.props.edit})
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
		reader.onload = () => this.setState({face_base64: reader.result});
	}
	
	searchSuppliers = (search_text) => {
		console.log("ire por proveedores");
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
	
	render = () => (
    <div>
      <Dialog
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
      >
        <Form {...this.state}
              id={this.props.edit}
              close={this.props.close}
              handleChange={this.handleChange}
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