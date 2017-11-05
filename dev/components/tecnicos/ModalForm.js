import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { toast } from 'react-toastify'
import { withApollo } from 'react-apollo'
import GetTecnico from '../../graphQL/querys/tecnico.graphql'

const initialState = {
  departamento: "",
  nombre: "",
  apellido: "",
  identificacion: "",
  email: "",
  telefono: "",
  profesion: "",
  departamento: "",
  fecha_nac: null,
}

@withApollo
class ModalForm extends Component {
  state = initialState

  componentWillReceiveProps = async (nextProps) => {
    /*cuando el modal de edicion se presenta en pantalla*/
    if(nextProps.edit && nextProps.open){ /*si es el formulario en edicion*/
      var tecnico = await nextProps.client.query({
        query: GetTecnico,
        fetchPolicy: 'network-only',
        variables: {id: nextProps.edit}
      }).then(response => {
        /*le quito el __typename para que la mutacion posterior funcione bien*/
        let {__typename, ...tecnico} = response.data.tecnico; 
        return tecnico;
      });
      //console.log(tecnico);
      this.setState({
        ...tecnico,
        fecha_nac : new Date(tecnico.fecha_nac)
      });
    }
  }

  enviar = event => {
    event.preventDefault();
    let tecnico = {...this.state, fecha_nac: this.state.fecha_nac.toString()};
    if(!this.props.edit) console.log("creando tecnico", tecnico);
    else console.log("actualizando tecnico", tecnico);
    this.props.submit(tecnico)
      .then(response => {
        if(!this.props.edit) toast.success(response.data.createTecnico);
        else toast.success(response.data.updateTecnico);
        this.setState(initialState);
        this.props.close();
      })
  };

  handleChange = e =>  this.setState({[e.target.name]: e.target.value});

  handleDepChange = (e, i, value) => this.setState({departamento : value});

  handleFechaChange = (e, date) => this.setState({fecha_nac : date});

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