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


class ClientesTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
			id_edit: 0
		}
	}
		
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
              <TableHeaderColumn className="avatar">Foto</TableHeaderColumn>
              <TableHeaderColumn className="fullname">Nombre</TableHeaderColumn>
              <TableHeaderColumn className="email">Email</TableHeaderColumn>
              <TableHeaderColumn>Telefono</TableHeaderColumn>
              <TableHeaderColumn>Organizacion</TableHeaderColumn>
              <TableHeaderColumn className="center">Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
						{
							do {
								if(this.props.data.loading && !this.props.data.clients) "";
								else {
									clients.map((client, i) => (
                    					<TableRow key={i}>
                      						<TableRowColumn className="avatar">
												{
													do {
														if(client.face_base64)
															(<Avatar src={client.face_base64} />)
														else (<Avatar icon={<Face/>}/>)
													}
												}
											</TableRowColumn>
										  	<TableRowColumn className="fullname">{`${client.name} ${client.lastname}`}</TableRowColumn>
										  	<TableRowColumn className="email">{client.email}</TableRowColumn>
										  	<TableRowColumn>{client.phones[0]}</TableRowColumn>
										  	<TableRowColumn>{client.organization.name}</TableRowColumn>
										  	<TableRowColumn className="center">
												<Plus onClick={this.props.edit(client.id)}
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
      </div>
		)
	}
}

export default ClientesTable;