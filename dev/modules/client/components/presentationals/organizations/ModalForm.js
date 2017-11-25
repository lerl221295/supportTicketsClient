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
      let {__typename, ...organization} = nextProps.editing
      this.setState({organization: {
          ...organization,
          domains: nextProps.editing.domains.join(', ')
      }})
		}
  };

  cleanForm = () => this.setState({organization: initialState.organization});

  send = event => {
    event.preventDefault();
    let { organization } = this.state;
    organization.domains = organization.domains.replace(/\s/g, '').split(',');
    if(!this.props.editing) console.log("creando organizatione", organization);
    else console.log("actualizando organizatione", organization);
    this.props.close();
    this.props.submit({...organization, id: this.props.editing.id })
      .then(response => {
        //if(!this.props.editing) toast.success(response.data.createOrganizacion);
        //else toast.success(response.data.updateOrganizacion);
        if(this.props.editing) this.props.notificate("Organizacion actualizada con exito!");
        else this.props.notificate("Organizacion guardada con exito!");
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
        contentStyle={{width: '40%'}}
        titleClassName="center-align"
      >
        <Form
            {...this.state.organization}
            close={this.props.close}
            handleChange={this.handleChange}
            clean={this.cleanForm}
            send={this.send}
        />
      </Dialog>
    </div>
  )
}


export default ModalForm