import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { toast } from 'react-toastify'
import { withApollo } from 'react-apollo'
import GetClient from '../../graphQL/querys/client.graphql'

const initialState = {
  name: "",
  lastname: "",
  phones: "",
  email: "",
  face_base64: null,
  address: "",
  organization_id: null,
  about: ""
}

@withApollo
class ModalForm extends Component {
  componentWillReceiveProps = async (nextProps) => {
    //cuando el modal de edicion se presenta en pantalla
    if(nextProps.edit && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
      var client = await nextProps.client.query({
        query: GetClient,
        fetchPolicy: 'network-only',
        variables: {id: nextProps.edit}
      }).then(response => {
        //le quito el __typename para que la mutacion posterior funcione bien
        let {__typename, ...client} = response.data.client;
        delete client.organization;//no pude sacarlo con el destructuring :c
        client.organization_id = response.data.client.organization.id;
        return client;
      });
      this.setState({
        ...client, 
        phones: client.phones.join(', ')
      });
    }
  }

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
        />
      </Dialog>
    </div>
  )
}


export default ModalForm