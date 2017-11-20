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
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui/svg-icons/action/face'

import FormEdit from '../../containers/Clients/EditClient'

import filter from '../../../utils/filter'

class ClientesTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
			id_edit: 0
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
		let {clients, total} = do {
			if(this.props.data.clients) ({
				clients: this.props.data.clients.nodes,
				total: this.props.data.clients.count
			});
			else ({clients: [], total: 1});
		};
		
		let pags = Math.ceil(total/this.props.limit);
		return (
      <div>
				{loading}
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Foto</TableHeaderColumn>
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
								if(this.props.data.loading && !this.props.data.clients) "";
								else {
									clients.map((client, i) => (
                    <TableRow key={i}>
                      <TableRowColumn>
												{
													do {
														if(client.face_base64)
															(<Avatar src={client.face_base64} />)
														else (<Avatar icon={<Face/>}/>)
													}
												}
                      </TableRowColumn>
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
                  current = { this.props.current }
                  display = { 5 }
                  onChange = { number => this.props.changePag(number) }
                />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <FormEdit
          title="Actualizar datos del Cliente"
          open={this.state.modalOpen}
          close={this.closeModal}
          edit={this.state.id_edit}
          notificate={this.props.notificate}
          limit={this.props.limit}
        />
      </div>
		)
	}
}

export default ClientesTable;