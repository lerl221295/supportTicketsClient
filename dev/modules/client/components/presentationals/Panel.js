import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import ClientsTable from './single/Table'
//import FloatingActionButton from 'material-ui/FloatingActionButton'
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial'
import Person from 'material-ui/svg-icons/social/person'
import Organization from 'material-ui/svg-icons/communication/business'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ServiceFail from '../ServiceFail'
import FormCreateClient from '../../containers/Clients/CreateClient'
import SearchBox from '../SearchBox'
import Snackbar from 'material-ui/Snackbar';

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
			table_pag: 1,
			search_text: null, //ultimo text sercheado xd
			notificationOpen: false,
			notificationText: "hola"
		}
	}

	search = search_text => {
		this.setState({search_text, table_pag: 1});
		this.props.data.refetch({search_text, offset: null, limit: this.props.limit});
	};

	changePag = number => {
		this.setState({ table_pag: number });
		this.props.data.refetch({
			limit: this.props.limit,
			offset: (number-1)*this.props.limit,
			search_text: this.state.search_text
		})
	};

	notificate = text => {
		this.setState({
			notificationOpen: true,
			notificationText: text
		})
	};

	openModal = event => this.setState({ modalOpen : true });

	closeModal = event => this.setState({ modalOpen : false });

	render = () => {
        return(
			<div>
				<Tabs>
					<Tab
						label={"Clientes"}
						icon={<Person/>}
					>
						<SearchBox search={this.search}/>
						<ClientsTable data={this.props.data} search={this.props.search}
							   limit={this.props.limit}
							   current={this.state.table_pag}
							   changePag={this.changePag}
							   notificate={this.notificate}
						/>
					</Tab>
					<Tab
						label={"Organizaciones"}
						icon={<Organization/>}
					>
						<h1>Organizaciones</h1>
					</Tab>
				</Tabs>

                {/*<FloatingActionButton className="fab" onClick={this.openModal}>
					<ContentAdd />
				</FloatingActionButton>*/}
				<SpeedDial
					style={{float: "right"}}
					fabContentOpen={
						<ContentAdd />
                    }
					fabContentClose={
						<NavigationClose />
                    }
				>
					<SpeedDialItem
						label="Nuevo Cliente"
						fabContent={<Person/>}
						onTouchTap={this.openModal}
					/>
					<SpeedDialItem
						label="Nueva Organizacion"
						fabContent={<Organization/>}
						onTouchTap={()=> console.log("modal para organizacion")}
					/>
				</SpeedDial>
				<FormCreateClient
					title="Crear un nuevo Cliente"
					open={this.state.modalOpen}
					close={this.closeModal}
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