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

import FormEdit from '../../containers/EditTecnico'

import filter from '../../utils/filter'

class TecnicosTable extends Component {
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

  camposFiltrar = ['nombre', 'apellido', 'identificacion'];

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.search !== "") this.setState({current: 1});
  };

  render = () => {
    var cargarndo = do {
      if (this.props.data.loading) { <LinearProgress mode="indeterminate" /> }
      else { "" }
    }

    let tecnicos = filter(this.camposFiltrar, this.props.data.tecnicos, this.props.search);

    let pags = Math.ceil(tecnicos.length/8);
    let n = (this.state.current-1)*8;
    let tecnicosOfPag = tecnicos.slice(n, n+8);

    return (
      <div>  
        {cargarndo}
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Apellido</TableHeaderColumn>
              <TableHeaderColumn>Identificacion</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Telefono</TableHeaderColumn>
              <TableHeaderColumn>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              do {
                if(this.props.data.loading) "";
                else {
                  tecnicosOfPag.map((tecnico, i) => (
                    <TableRow key={i}>
                      <TableRowColumn>{tecnico.nombre}</TableRowColumn>
                      <TableRowColumn>{tecnico.apellido}</TableRowColumn>
                      <TableRowColumn>{tecnico.identificacion}</TableRowColumn>
                      <TableRowColumn>{tecnico.email}</TableRowColumn>
                      <TableRowColumn>{tecnico.telefono}</TableRowColumn>
                      <TableRowColumn> 
                        <Plus onClick={this.edit(tecnico.id)}
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
          title="Actualizar datos del Tecnico"
          open={this.state.modalOpen} 
          close={this.closeModal}
          edit={this.state.id_edit} />
      </div>
    )
  }
}

export default TecnicosTable;