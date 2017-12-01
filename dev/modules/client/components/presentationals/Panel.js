import React, { Component } from 'react'
import {Avatar, Snackbar, Tabs, Tab} from "material-ui";
import Person from 'material-ui/svg-icons/social/person'
import Organization from 'material-ui/svg-icons/communication/business'
import { WrappedSpeedDial, ServiceFail, SearchBox } from '../../../../common/components'
import ClientsTable from './single/Table'
import OrganizationsTable from './organizations/Table'

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			clients: {
                table_pag: 1,
                search_text: ''
			},
			organizations: {
                table_pag: 1,
                search_text: ''
			}
		};
		
		this.speedDialItems = [
			{
				itemClick: () => this.props.push('clients/new'),
				primaryText: 'Cliente',
				rightAvatar: <Avatar icon={<Person />} />,
			},
			{
				itemClick: () => this.props.push('/clients/organizations/new'),
				primaryText: 'Organización',
				rightAvatar: <Avatar icon={<Organization />} />,
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
		return(
			<div>
				<Tabs>
					<Tab
						label={"Clientes"}
						icon={<Person/>}
					>
						<SearchBox search={this.search("clients")}/>
						<ClientsTable
							data={this.props.clients}
							organizations={this.props.organizations.organizations || []}
							search={this.state.clients.search_text}
							limit={this.props.limit}
							current={this.state.clients.table_pag}
							changePag={this.changePag("clients")}
							edit={(id) => event => this.props.push(`clients/${id}`)}
						/>
					</Tab>
					<Tab
						label={"Organizaciones"}
						icon={<Organization/>}
					>
						<SearchBox search={this.search("organizations")}/>
						<OrganizationsTable
							data={this.props.organizations}
							search={this.state.organizations.search_text}
							limit={this.props.limit}
							current={this.state.organizations.table_pag}
							changePag={this.changePag("organizations")}
							edit={(id) => event => this.props.push(`clients/organizations/${id}`)}
						/>
					</Tab>
				</Tabs>
				<WrappedSpeedDial items={this.speedDialItems} />
			</div>
		)
		if (this.props.data.error) return <ServiceFail />;
	}
}

export default Panel