import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { toast } from 'react-toastify'
import { withApollo } from 'react-apollo'
import GetCliente from '../../graphQL/querys/cliente.graphql'

const initialState = {
  nombre: "",
  apellido: "",
  identificacion: "",
  email: "",
  telefono: "",
  ubicacion: ""
}

@withApollo
class ModalForm extends Component {
  componentWillReceiveProps = async (nextProps) => {
    /*cuando el modal de edicion se presenta en pantalla*/
    if(nextProps.edit && nextProps.open){ /*si es el formulario en edicion*/
      var cliente = await nextProps.client.query({
        query: GetCliente,
        fetchPolicy: 'network-only',
        variables: {id: nextProps.edit}
      }).then(response => {
        /*le quito el __typename para que la mutacion posterior funcione bien*/
        let {__typename, ...cliente} = response.data.cliente; 
        return cliente;
      });
      this.setState(cliente);
    }
  }

  enviar = event => {
    event.preventDefault();
    if(!this.props.edit) console.log("creando cliente", this.state);
    else console.log("actualizando cliente", this.state);
    this.props.submit(this.state)
      .then(response => {
        if(!this.props.edit) toast.success(response.data.createCliente);
        else toast.success(response.data.updateCliente);
        this.setState(initialState)
        this.props.close();
      })
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
          handleDepChange={this.handleDepChange}
          handleFechaChange={this.handleFechaChange}
          enviar={this.enviar}
        />
      </Dialog>
    </div>
  )
}


export default ModalForm