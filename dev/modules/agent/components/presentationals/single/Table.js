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
import Avatar from 'material-ui/Avatar'
import FormEdit from '../../containers/EditAgent'

class AgentsTable extends Component {
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
							<TableHeaderColumn className="center">Edit</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							do {
								if(!this.props.data.loading && agents) {
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
												<Plus onClick={this.edit(agent.id)}
												      className="edit"
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
				<FormEdit
					title = "Actualizar datos del agente"
					open = {this.state.modalOpen}
					close = {this.closeModal}
					id = {this.state.id_edit}
					notificate = {this.props.notificate}
					limit = {this.props.limit}
				/>
			</div>
		)
	}
}

export default AgentsTable;