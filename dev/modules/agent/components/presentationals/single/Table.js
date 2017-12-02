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
import theme from '../../../../../theme-default'
import Pagination from 'material-ui-pagination'
import { LinearProgress, Avatar } from 'material-ui'
import { ImageRemoveRedEye as Eye} from 'material-ui/svg-icons'

class AgentsTable extends Component {	
	render = () => {
		let loading = do {
			if (this.props.data.loading) { <LinearProgress mode="indeterminate" /> }
		};
		
		// let tecnicos = filter(this.camposFiltrar, this.props.data.tecnicos, this.props.search);
		let {agents, total} = do {
			if(this.props.data.agents) ({
				agents: this.props.data.agents.nodes,
				total: this.props.data.agents.count
			});
			else ({agents: [], total: 1});
		};
		
		agents = agents.map((agent) => {
			switch (agent.role) {
				case 'SUPERVISOR':
					return ({ ...agent, role: 'Supervisor'});
					break;
				case 'AGENT':
					return ({ ...agent, role: 'Agente'});
					break;
				case 'ADMIN':
					return ({ ...agent, role: 'Administrador'});
					break;
			}
		});
		
		let pags = Math.ceil(total/this.props.limit);
		
		return (
			<div>
				{loading}
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false} striped={true}>
						<TableRow>
							<TableHeaderColumn className="avatar">Foto</TableHeaderColumn>
							<TableHeaderColumn className="fullname">Nombre completo</TableHeaderColumn>
							<TableHeaderColumn className="email">Email</TableHeaderColumn>
							<TableHeaderColumn>Telefono</TableHeaderColumn>
							<TableHeaderColumn>Role</TableHeaderColumn>
							<TableHeaderColumn>Proveedor</TableHeaderColumn>
							<TableHeaderColumn className="center">Detalle</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							do {
								if(!this.props.data.loading && this.props.data.agents) {
									agents.map((agent, i) => (
										<TableRow key={i}>
											<TableRowColumn className="avatar">
												{
													do {
														if(agent.face_base64)
															(<Avatar src={agent.face_base64} />)
														else (<Avatar icon={<Face/>}/>)
													}
												}
											</TableRowColumn>
											<TableRowColumn className="fullname">{agent.name}</TableRowColumn>
											<TableRowColumn className="email">{agent.email}</TableRowColumn>
											<TableRowColumn>{agent.phones[0]}</TableRowColumn>
											<TableRowColumn>{agent.role}</TableRowColumn>
											<TableRowColumn>{agent.supplier.name}</TableRowColumn>
											<TableRowColumn className="center">
												<Eye onClick={this.props.edit(agent.id)}
												      className="edit"
												      hoverColor={theme.palette.accent1Color}/>
											</TableRowColumn>
										</TableRow>
									))
								}
							}
						}
					
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableRowColumn colSpan="3" className="center">
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

export default AgentsTable;