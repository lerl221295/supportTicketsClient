import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { toast } from 'react-toastify'
import { withApollo } from 'react-apollo'
import GetAgent from '../../../graphql/querys/agent.graphql'
import GetSuppliersNames from '../../../graphql/querys/suppliersNames.graphql'
import GetGroupsNames from '../../../graphql/querys/groupsNames.graphql'

const initialState = {
	name: "",
	lastname: "",
	role: "",
	sex: "",
	email: "",
	phones: [],
	about: "",
	profession: "",
	face_base64: "",
	avatar_filename: "Seleccione una imagen ...",
	groups: [],
	supplier: null
};

@withApollo
class ModalForm extends Component {
	
	state = initialState;
	
	componentWillReceiveProps = async (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		if(nextProps.id && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			let agent = await nextProps.client.query({
				query: GetAgent,
				fetchPolicy: 'network-only',
				variables: {id: nextProps.id}
			}).then(({ data }) => {
				let {__typename, ...agent} = data.agent;
				/*delete agent.supplier;//no pude sacarlo con el destructuring :c
				agent.supplier_id = data.agent.supplier.id;*/
				return agent;
			});
			// console.log("El agente", agent);
			this.setState({
				...agent,
				phones: agent.phones.join('; ')
			});
		}
	};
	
	cleanForm = () => this.setState(initialState);
	
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
		
		if(!this.props.id) console.log("creando agente", agent);
		else console.log("actualizando agente", agent);
		this.props.close();
		this.props.submit({...agent, id: this.props.id})
			.then(response => {
				//if(!this.props.id) toast.success(response.data.createCliente);
				//else toast.success(response.data.updateCliente);
				if(this.props.id) this.props.notificate("Agente actualizado con éxito!");
				else this.props.notificate("Agente guardado con éxito!");
				this.setState(initialState);
			})
	};
	
	changeImage = ({target: { files: [file] } }) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => this.setState({face_base64: reader.result, avatar_filename: file.name});
	};
	
	searchEntity = (Query, entity) => (search_text) => {
		return (
			this.props.client.query({
				query: Query,
				variables: {search_text}
			}).then( ({data}) => {
				return data[entity].nodes.map(ent => ({
					id: ent.id,
					name: ent.name
				}))
			})
				.then(options => {
					// console.log("cargando estas opciones",options);
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
	
	handleChange = e => this.setState({[e.target.name]: e.target.value});
	
	handleSelectChange = (name) => (e, i, value) => this.setState({[name] : value});
	
	handleReactSelectChange = (name) => (selectValue) => this.setState({[name] : selectValue});
	
	render = () => (
    <div>
      <Dialog
        title={this.props.title}
        titleClassName={"center-align"}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
      >
        <Form {...this.state}
              id={this.props.id}
              close={this.props.close}
              handleChange={this.handleChange}
              handleSelectChange={this.handleSelectChange}
              handleReactSelectChange={this.handleReactSelectChange}
              clean={this.cleanForm}
              send={this.send}
              changeImage={this.changeImage}
              changeSupplier={this.changeSupplier}
              searchSuppliers={this.searchEntity(GetSuppliersNames, 'suppliers')}
              searchGroups={this.searchEntity(GetGroupsNames, 'groups')}
        />
      </Dialog>
    </div>
	)
}

export default ModalForm