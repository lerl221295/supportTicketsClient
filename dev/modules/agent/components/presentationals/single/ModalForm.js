import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { toast } from 'react-toastify'
import { withApollo } from 'react-apollo'
import GetAgent from '../../../graphql/querys/agent.graphql'
import GetSuppliersNames from '../../../graphql/querys/suppliersNames.graphql'
import GetGroupsNames from '../../../graphql/querys/groupsNames.graphql'
import stylesForm from '../../../../../styles/javascript/forms'

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
	supplier_id: "",
	supplier: null
};

@withApollo
class ModalForm extends Component {
	
	state = initialState;
	
	componentWillReceiveProps = async (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		if(nextProps.edit && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			let agent = await nextProps.client.query({
				query: GetAgent,
				fetchPolicy: 'network-only',
				variables: {id: nextProps.edit}
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
	
	enviar = event => {
		event.preventDefault();
		let agent = this.state;
		agent.phones = agent.phones.replace(/\s/g, '').split(';');
		// Si no seleccionó ningún grupo, elimino groups
		if (agent.groups) {
			agent.groups_id = agent.groups.map(group => group.id);
			delete agent.groups;
		}
		else delete agent.groups_id;
		// Si no seleccionó ningún proveedor, elimino el supllier_id
		if (!agent.supplier) delete agent.supplier_id;
		// Si seleccionó un agente, entonces mapeo la data
		else agent.supplier_id = agent.supplier.id;
		// Siempre debo eliminar el supplier y el avatar_filename
		// porque no están definidos en graph como inputs
		delete agent.supplier;
		delete agent.avatar_filename;
		/*if(!this.props.edit) console.log("creando agente", agent);
		else console.log("actualizando agente", agent);*/
		this.props.close();
		this.props.submit({...agent, id: this.props.edit})
			.then(response => {
				//if(!this.props.edit) toast.success(response.data.createCliente);
				//else toast.success(response.data.updateCliente);
				if(this.props.edit) this.props.notificate("Agente actualizado con éxito!");
				else this.props.notificate("Agente guardado con éxito!");
				this.setState(initialState);
			})
	};
	
	changeImage = ({target: { files: [file] } }) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => this.setState({face_base64: reader.result, avatar_filename: file.name});
	}
	
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
        titleStyle={stylesForm.title}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
      >
        <Form {...this.state}
              id={this.props.edit}
              close={this.props.close}
              handleChange={this.handleChange}
              handleSelectChange={this.handleSelectChange}
              handleReactSelectChange={this.handleReactSelectChange}
              clean={this.cleanForm}
              enviar={this.enviar}
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