import React, { Component } from 'react'
// Material Components
import {Avatar, Snackbar, Tab, Tabs} from "material-ui";
// Colores
import { pink400 } from 'material-ui/styles/colors';
// Íconos
import Person from 'material-ui/svg-icons/social/person'
import People from 'material-ui/svg-icons/social/people'
import PeopleOutline from 'material-ui/svg-icons/social/people-outline'
import Organization from 'material-ui/svg-icons/communication/business'
// Common Components
import {SearchBox, WrappedSpeedDial} from '../../../../common/components'
// Containers
import FormCreateAgent from '../containers/CreateAgent'
import FormCreateSupplier from '../containers/CreateSupplier'
import FormCreateGroup from '../containers/CreateGroup'
// Tablas
import AgentsTable from './single/Table'
import SuppliersTable from './suppliers/Table'
import GroupsTable from './groups/Table'

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			agents: {
				modalOpen : false,
				table_pag: 1,
				search_text: ''
			},
			suppliers: {
				modalOpen : false,
				table_pag: 1,
				search_text: ''
			},
			groups: {
				modalOpen : false,
				table_pag: 1,
				search_text: ''
			},
			notificationOpen: false,
			notificationText: "hola"
		};
		
		this.speedDialItems = [
			{
				itemClick: this.openModal('agents'),
				primaryText: 'Agente',
				rightAvatar: <Avatar backgroundColor={pink400} icon={<Person />} />,
			},
			{
				itemClick: this.openModal('suppliers'),
				primaryText: 'Proveedores',
				rightAvatar: <Avatar backgroundColor={pink400} icon={<People />} />,
			},
			{
				itemClick: this.openModal('groups'),
				primaryText: 'Grupos',
				rightAvatar: <Avatar backgroundColor={pink400} icon={<PeopleOutline />} />,
			}
		];
	}
	
	search = name => search_text => {
		this.setState({[name]: {...this.state[name], search_text}})
		/*this.setState({
			search_text,
			clients: {...this.state.clients, table_pag: 1},
			organizations:{...this.state.organizations, table_pag: 1}
		});*/
		this.props[name].refetch({search_text, offset: null, limit: this.props.limit});
	};
	
	changePag = name => number => {
		this.setState({[name]: { ...this.state[name] , table_pag: number} });
		this.props[name].refetch({
			limit: this.props.limit,
			offset: (number-1)*this.props.limit,
			search_text: this.state[name].search_text
		})
	};
	
	notificate = text => {
		this.setState({
			notificationOpen: true,
			notificationText: text
		})
	};
	
	openModal = name => event => this.setState({[name]: { modalOpen : true }});
	
	closeModal = name => event => this.setState({[name]: { modalOpen : false }});
	
	render = () => {
		// if(this.props.data.error) return <ServiceFail />;
		return(
			<div>
				<Tabs>
					<Tab
						label={"Agentes"}
						icon={<Person/>}
					>
						<SearchBox search={this.search("agents")}/>
						<AgentsTable
							data={this.props.agents}
							search={this.props.search}
							limit={this.props.limit}
							current={this.state.table_pag}
							changePag={this.changePag}
							notificate={this.notificate}
						/>
					</Tab>
					<Tab
						label={"Proveedores"}
						icon={<People/>}
					>
						<SearchBox search={this.search("suppliers")}/>
						<SuppliersTable
							data={this.props.suppliers}
							search={this.state.suppliers.search_text}
							limit={this.props.limit}
							current={this.state.suppliers.table_pag}
							changePag={this.changePag("suppliers")}
							notificate={this.notificate}
						/>
					</Tab>
					<Tab
						label={"Grupos"}
						icon={<Organization/>}
					>
						<SearchBox search={this.search("groups")}/>
						<GroupsTable
							data={this.props.groups}
							search={this.state.groups.search_text}
							limit={this.props.limit}
							current={this.state.groups.table_pag}
							changePag={this.changePag("groups")}
							notificate={this.notificate}
						/>
					</Tab>
				</Tabs>
				<WrappedSpeedDial items={this.speedDialItems} />
				<FormCreateAgent
					title="Crear un nuevo agente"
					open={this.state.agents.modalOpen}
					close={this.closeModal('agents')}
					notificate={this.notificate}
				/>
				<FormCreateSupplier
					title="Crear un nuevo proveedor"
					open={this.state.suppliers.modalOpen}
					close={this.closeModal('suppliers')}
					notificate={this.notificate}
				/>
				<FormCreateGroup
					title="Crear un nuevo grupo"
					open={this.state.groups.modalOpen}
					close={this.closeModal('groups')}
					notificate={this.notificate}
				/>
				<Snackbar
					open={this.state.notificationOpen}
					message={this.state.notificationText}
					autoHideDuration={4000}
					onRequestClose={() => this.setState({notificationOpen: false})}
				/>
			</div>
		)
	}
}

export default Panel