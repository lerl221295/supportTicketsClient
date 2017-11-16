import React, { Component } from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'material-ui/Table'
import Pagination from 'material-ui-pagination'
import LinearProgress from 'material-ui/LinearProgress'
import Plus from 'material-ui/svg-icons/content/create'

import FormEdit from '../../containers/EditCliente'

import filter from '../../utils/filter'

class ClientesTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen : false,
      id_edit: 0,
      current: 1
    }
  }

  edit = id => event =>  this.setState({id_edit: id, modalOpen : true});

  closeModal = event => this.setState({ modalOpen : false });

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.search !== "") this.setState({current: 1});
  };

  render = () => {
    let loading = do {
      if (this.props.data.loading) { <LinearProgress mode="indeterminate" /> }
      else { "" }
    }

    //let clients = filter(this.camposFiltrar, this.props.data.clients, this.props.search);
    let clients = do {
      if(this.props.data.clients) this.props.data.clients;
      else [];
    }

    let pags = Math.ceil(clients.length/8);
    let n = (this.state.current-1)*8;
    let clientsOfPag = clients.slice(n, n+8);

    return (
      <div>  
        {loading}
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Apellido</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Telefono</TableHeaderColumn>
              <TableHeaderColumn>Organizacion</TableHeaderColumn>
              <TableHeaderColumn>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              do {
                if(this.props.data.loading) "";
                else {
                  clientsOfPag.map((client, i) => (
                    <TableRow key={i}>
                      <TableRowColumn>{client.name}</TableRowColumn>
                      <TableRowColumn>{client.lastname}</TableRowColumn>
                      <TableRowColumn>{client.email}</TableRowColumn>
                      <TableRowColumn>{client.phones[0]}</TableRowColumn>
                      <TableRowColumn>{client.organization.name}</TableRowColumn>
                      <TableRowColumn>
                        <Plus onClick={this.edit(client.id)}
                          style={{cursor: "pointer"}}
                          hoverColor="blue"/>
                      </TableRowColumn>
                    </TableRow>
                  ))
                }
              }
            }
            
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                <Pagination
                  total = { pags }
                  current = { this.state.current }
                  display = { 5 }
                  onChange = { number => this.setState({ current: number }) }
                />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <FormEdit 
          title="Actualizar datos del Cliente"
          open={this.state.modalOpen} 
          close={this.closeModal}
          edit={this.state.id_edit} />
      </div>
    )
  }
}

export default ClientesTable;