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

import FormEdit from '../../containers/Agents/EditAgent'

import filter from '../../../utils/filter'

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
		var loading = do {
			if (this.props.data.loading) { <LinearProgress mode="indeterminate" /> }
			else { "" }
		};
		
		// let tecnicos = filter(this.camposFiltrar, this.props.data.tecnicos, this.props.search);
		let {agents, total} = do {
			if(this.props.data.agents) ({
				agents: this.props.data.agents.nodes,
				total: this.props.data.agents.count
			});
			else ({agents: [], total: 1});
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
							<TableHeaderColumn>Role</TableHeaderColumn>
							<TableHeaderColumn>Proveedor</TableHeaderColumn>
							<TableHeaderColumn>Edit</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							do {
								if(this.props.data.loading && !this.props.data.agents) "";
								else {
									agents.map((agent, i) => (
										<TableRow key={i}>
											<TableRowColumn>
												{
													do {
														if(agent.face_base64)
															(<Avatar src={agent.face_base64} />)
														else (<Avatar icon={<Face/>}/>)
													}
												}
											</TableRowColumn>
											<TableRowColumn>{agent.name}</TableRowColumn>
											<TableRowColumn>{agent.lastname}</TableRowColumn>
											<TableRowColumn>{agent.email}</TableRowColumn>
											<TableRowColumn>{agent.phones[0]}</TableRowColumn>
											<TableRowColumn>{agent.role}</TableRowColumn>
											<TableRowColumn>{agent.supplier.name}</TableRowColumn>
											<TableRowColumn>
												<Plus onClick={this.edit(agent.id)}
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
					title = "Actualizar datos del Agente"
					open = {this.state.modalOpen}
					close = {this.closeModal}
					edit = {this.state.id_edit}
					notificate = {this.props.notificate}
					limit = {this.props.limit}
				/>
			</div>
		)
	}
}

export default AgentsTable;