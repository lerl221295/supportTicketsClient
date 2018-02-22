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
import Avatar from 'material-ui/Avatar'
import theme from '../../../../../theme-default'
import { ActionFace as Face, ImageRemoveRedEye as Eye } from 'material-ui/svg-icons'


class ClientesTable extends Component {
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
              <TableHeaderColumn className="center">Detalle</TableHeaderColumn>
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
										  	<TableRowColumn>{client.phones[0] || "Desconocido"}</TableRowColumn>
										  	<TableRowColumn>{do {
										  		if(client.organization)
										  			client.organization.name;
										  		else "Particular";
										  	}}</TableRowColumn>
										  	<TableRowColumn className="center">
												<Eye onClick={this.props.edit(client.id)}
													  style={{cursor: "pointer"}}
													  hoverColor={theme.palette.accent1Color}
												/>
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