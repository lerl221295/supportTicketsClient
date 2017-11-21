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

import FormEdit from '../../containers/EditAgent'

const tableStyles = {
	avatar: {
		width: '2rem',
		textAlign: 'center'
	},
	fullname: {
		width: '8rem'
	},
	email: {
		width: '12rem'
	},
	edit: {
		cursor: "pointer"
	},
	center: {
		textAlign: 'center'
	}
};

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
		
		let pags = Math.ceil(total/this.props.limit);
		
		return (
			<div>
				{loading}
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false} striped={true}>
						<TableRow>
							<TableHeaderColumn style={tableStyles.avatar}>Foto</TableHeaderColumn>
							<TableHeaderColumn style={tableStyles.fullname}>Nombre completo</TableHeaderColumn>
							<TableHeaderColumn style={tableStyles.email}>Email</TableHeaderColumn>
							<TableHeaderColumn>Telefono</TableHeaderColumn>
							<TableHeaderColumn>Role</TableHeaderColumn>
							<TableHeaderColumn>Proveedor</TableHeaderColumn>
							<TableHeaderColumn style={tableStyles.center}>Edit</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							do {
								if(!this.props.data.loading && agents) {
									agents.map((agent, i) => (
										<TableRow key={i}>
											<TableRowColumn style={tableStyles.avatar}>
												{
													do {
														if(agent.face_base64)
															(<Avatar src={agent.face_base64} />)
														else (<Avatar icon={<Face/>}/>)
													}
												}
											</TableRowColumn>
											<TableRowColumn style={tableStyles.name}>{agent.name} {agent.lastname}</TableRowColumn>
											<TableRowColumn style={tableStyles.email}>{agent.email}</TableRowColumn>
											<TableRowColumn>{agent.phones[0]}</TableRowColumn>
											<TableRowColumn>{agent.role}</TableRowColumn>
											<TableRowColumn>{agent.supplier.name}</TableRowColumn>
											<TableRowColumn style={tableStyles.center}>
												<Plus onClick={this.edit(agent.id)}
												      style={tableStyles.edit}
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
							<TableRowColumn colSpan="3" style={tableStyles.center}>
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
					edit = {this.state.id_edit}
					notificate = {this.props.notificate}
					limit = {this.props.limit}
				/>
			</div>
		)
	}
}

export default AgentsTable;