import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { withApollo } from 'react-apollo'

const initialState = {
  organization: {
    name: "",
    about: "",
    domains: ""
  }
}

@withApollo
class ModalForm extends Component {
  state = initialState;

  componentWillReceiveProps = (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		if(nextProps.editing && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			this.setState({organization: {
                ...this.props.editing,
                domains: this.props.editing.domains.join(', ');
            }})
		}
  };

  cleanForm = () => this.setState({organization: initialState.organization});

  enviar = event => {
    event.preventDefault();
    let { organization } = this.state;
    organization.domains = organization.phones.replace(/\s/g, '').split(',');
    if(!this.props.editing) console.log("creando organizatione", organization);
    else console.log("actualizando organizatione", organization);
    this.props.close();
    this.props.submit({...organization, id: this.props.editing.id})
      .then(response => {
        //if(!this.props.editing) toast.success(response.data.createCliente);
        //else toast.success(response.data.updateCliente);
        if(this.props.editing) this.props.notificate("Cliente actualizado con exito!");
        else this.props.notificate("Cliente guardado con exito!");
        this.cleanForm()
      })
  };

  handleChange = e =>  this.setState({
    //...this.state,
    organization: { ...this.state.organization, [e.target.name]: e.target.value }
  });

  render = () => (
    <div>
      <Dialog
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
      >
        <Form
            {...this.state.organization}
            close={this.props.close}
            handleChange={this.handleChange}
            clean={this.cleanForm}
            enviar={this.enviar}
        />
      </Dialog>
    </div>
  )
}


export default ModalForm