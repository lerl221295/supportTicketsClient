import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { withApollo } from 'react-apollo'
import GetAgents from '../../../graphql/querys/agents.graphql'
import GetSupplier from '../../../graphql/querys/supplier.graphql'
import stylesForm from '../../../../../styles/javascript/forms'

const initialState = {
	name: "",
	about: "",
	agents_id: [],
	agents: []
};

@withApollo
class ModalForm extends Component {
	
	state = initialState;
	
	componentWillReceiveProps = async (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		if(nextProps.id && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			let supplier = await nextProps.client.query({
				query: GetSupplier,
				fetchPolicy: 'network-only',
				variables: {id: nextProps.id}
			}).then(({ data }) => {
				let {__typename, ...supplier} = data.supplier;
				return supplier;
			});
			this.setState(supplier);
		}
	};
	
	cleanForm = () => this.setState(initialState);
	
	send = event => {
		event.preventDefault();
		let supplier = this.state;
		if (!supplier.agents.length) delete supplier.agents_id;
		else supplier.agents_id = supplier.agents.map(agent => agent.id);
		delete supplier.agents;
		if(!this.props.id) console.log("creando suppliere", supplier);
		else console.log("actualizando suppliere", supplier);
		this.props.close();
		this.props.submit({...supplier, id: this.props.id})
			.then(() => {
				if(this.props.id) this.props.notificate("Proveedor actualizado con éxito!");
				else this.props.notificate("Proveedor guardado con éxito!");
				this.setState(initialState);
			})
	};
	
	searchAgents = (search_text) => {
		return (
			this.props.client.query({
				query: GetAgents,
				variables: {search_text}
			})
				.then( ({data: {agents}}) => ({options: agents.nodes}) )
		)
	};
	
	handleChange = e => this.setState({[e.target.name]: e.target.value});
	
	handleReactSelectChange = (name) => (selectValue) => this.setState({[name] : selectValue});
	render = () => (
    <div>
      <Dialog
        title={this.props.title}
        titleStyle={stylesForm.title}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
        contentStyle={{width: '50%'}}
      >
        <Form {...this.state}
              id={this.props.id}
              close={this.props.close}
              handleChange={this.handleChange}
              handleReactSelectChange={this.handleReactSelectChange}
              clean={this.cleanForm}
              send={this.send}
              searchAgents={this.searchAgents}
        />
      </Dialog>
    </div>
	)
}

export default ModalForm