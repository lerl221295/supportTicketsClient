import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { toast } from 'react-toastify'
import InputWithIcon from '../InputWithIcon'
import Agent from 'material-ui/svg-icons/action/account-circle'

import { graphql } from 'react-apollo'
import AsignTecnico from '../../graphQL/mutations/asignTecnico.graphql'
//import Ticket from '../../graphQL/querys/ticket.graphql'

const configMutation = {
  props: ({ mutate }) => ({
    asignar: (tecnico_id, ticket_id) => mutate({ 
      variables: { tecnico_id, ticket_id }/*, 
      refetchQueries: [ { query: Ticket, variables: { id: ticket_id } }]*/ //recarga el ticket
    })
  })
}

@graphql(AsignTecnico, configMutation)
class ModalForm extends Component {
  state = {tecnico: 0}
  
  asignar = event => {
    event.preventDefault();
    this.props.asignar(this.state.tecnico, this.props.ticket)
      .then(r => {
        toast.success(r.data.asignTecnico);
        /*llama a la funcion provista por el component Details para recargar los detalles del ticket*/
        this.props.refetch();/*hice esto porque el refetchQueries no me funciono :c*/
        this.props.close();
      });
  };


  handleChange = (e, i, value) => this.setState({tecnico : value});

  actions = [
    <FlatButton
      label="Cancelar"
      primary={true}
      onClick={this.props.close}
    />,
    <FlatButton
      label="Asignar"
      primary={true}
      keyboardFocused={true}
      onClick={this.asignar}
    />,
  ];

  render = () => (
    <div>
      <Dialog
        title="Asigne un tecnico al ticket"
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
        actions={this.actions}
        contentStyle={{ width: '40%', maxWidth: 'none'}}
      >
         <InputWithIcon
            Icon={Agent}
            Input={SelectField}
            floatingLabelText="Seleccione el tecnico"
            onChange={this.handleChange}
            value={this.state.tecnico}
          >
            {
              this.props.tecnicos.map((tecnico, i) => (
                  <MenuItem key={i} 
                    primaryText={`${tecnico.nombre} ${tecnico.apellido}`} 
                    value={tecnico.id}/>
                )
              )
            }
          </InputWithIcon>
      </Dialog>
    </div>
  )
}


export default ModalForm