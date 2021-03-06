import React, { Component } from 'react'
// Material Components
import {Avatar, Tab, Tabs} from "material-ui";
// Colores
import { pink400 } from 'material-ui/styles/colors';
// Íconos
import { SocialPerson as Person,
	SocialPeople as People,
	SocialPeopleOutline as PeopleOutline,
	CommunicationBusiness as Organization
} from 'material-ui/svg-icons'
// Common Components
import {SearchBox, WrappedSpeedDial} from '../../../../common/components'
// Tablas
import AgentsTable from './single/Table'
import SuppliersTable from './suppliers/Table'
import GroupsTable from './groups/Table'

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			agents: {
				table_pag: 1,
				search_text: ''
			},
			suppliers: {
				table_pag: 1,
				search_text: ''
			},
			groups: {
				table_pag: 1,
				search_text: ''
			}
		};
		
		this.speedDialItems = [
			{
				itemClick: () => this.props.push('/admin/agents/new'),
				primaryText: 'Agente',
				rightAvatar: <Avatar icon={<Person />} />,
			},
			{
				itemClick: () => this.props.push('/admin/agents/suppliers/new'),
				primaryText: 'Proveedores',
				rightAvatar: <Avatar icon={<People />} />,
			},
			{
				itemClick: () => this.props.push('/admin/agents/groups/new'),
				primaryText: 'Grupos',
				rightAvatar: <Avatar icon={<PeopleOutline />} />,
			}
		];
	}
	
	search = name => search_text => {
		this.setState({[name]: {...this.state[name], search_text}})
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
							search={this.props.agents.search_text}
							limit={this.props.limit}
							current={this.state.agents.table_pag}
							changePag={this.changePag("agents")}
							edit={(id) => event => this.props.push(`/admin/agents/${id}`)}
						/>
					</Tab>
					<Tab
						label={"Proveedores"}
						icon={<Organization/>}
					>
						<SearchBox search={this.search("suppliers")}/>
						<SuppliersTable
							data={this.props.suppliers}
							search={this.state.suppliers.search_text}
							limit={this.props.limit}
							current={this.state.suppliers.table_pag}
							changePag={this.changePag("suppliers")}
							edit={(id) => event => this.props.push(`/admin/agents/suppliers/${id}`)}
						/>
					</Tab>
					<Tab
						label={"Grupos"}
						icon={<People/>}
					>
						<SearchBox search={this.search("groups")}/>
						<GroupsTable
							data={this.props.groups}
							search={this.state.groups.search_text}
							limit={this.props.limit}
							current={this.state.groups.table_pag}
							changePag={this.changePag("groups")}
							edit={(id) => event => this.props.push(`/admin/agents/groups/${id}`)}
						/>
					</Tab>
				</Tabs>
				<WrappedSpeedDial items={this.speedDialItems} />
			</div>
		)
	}
}

export default Panel