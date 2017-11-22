import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
//import FloatingActionButton from 'material-ui/FloatingActionButton'
// import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial'
import {Avatar, Snackbar} from "material-ui";
import { pink400 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person'
import Organization from 'material-ui/svg-icons/communication/business'
import { WrappedSpeedDial, ServiceFail, SearchBox } from '../../../../common/components'
import FormCreateClient from '../containers/CreateClient'
import FormCreateOrganization from '../containers/CreateOrganization'
import ClientsTable from './single/Table'
import OrganizationsTable from './organizations/Table'

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			clients: {
                modalOpen : false,
                table_pag: 1,
                search_text: ''
			},
			organizations: {
                modalOpen : false,
                table_pag: 1,
                search_text: ''
			},
			notificationOpen: false,
			notificationText: "hola"
		};
		
		this.speedDialItems = [
			{
				itemClick: this.openModal('clients'),
				primaryText: 'Cliente',
				rightAvatar: <Avatar backgroundColor={pink400} icon={<Person />} />,
			},
			{
				itemClick: this.openModal('organizations'),
				primaryText: 'Organización',
				rightAvatar: <Avatar backgroundColor={pink400} icon={<Organization />} />,
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
		//console.log(this.props)
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
							notificate={this.notificate}
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
							notificate={this.notificate}
						/>
					</Tab>
				</Tabs>
				<WrappedSpeedDial items={this.speedDialItems} />
				<FormCreateClient
					title="Crear un nuevo Cliente"
					open={this.state.clients.modalOpen}
					close={this.closeModal("clients")}
					notificate={this.notificate}
				/>
				<FormCreateOrganization
					title="Crear una nueva Organizacion"
					open={this.state.organizations.modalOpen}
					close={this.closeModal("organizations")}
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
        if(this.props.data.error) return <ServiceFail />;
	}
}

export default Panel