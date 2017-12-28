import React, { Component, PropTypes } from 'react'
// React-Redux
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// Material-UI Components
import {Snackbar, Dialog} from 'material-ui'
// Material-UI Utils
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth'
// Material-UI Theme config
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ThemeDefault from '../../../theme-default'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Common Components
import Header from './Header/HeaderContainer'
import LeftDrawer from './Drawer/LeftDrawer'

// Icons
import {
	ActionDashboard as Dashboard,
	ActionDateRange as Date,
	ActionHourglassEmpty as Hourglass,
	ActionPermIdentity as PermIdentity,
	ActionSettingsApplications as Settings,
	ActionVisibility as Eye,
	//FileCloudQueue as Doc,
	//ImageLinkedCamera as Camera,
	ActionAssignment as Tasks,
	HardwareLaptop as Laptop,
	HardwareWatch as Watch,
	MapsLocalShipping as Truck,
	NotificationConfirmationNumber as Ticket,
	SocialPerson as Person,
	AvLibraryBooks as TicketFields,
	MapsLocalLibrary as Library,
	CommunicationEmail as Email,
	ImagePalette as Palette
	} from 'material-ui/svg-icons/index'
// import { getUser } from '../../utils/Authenticate'
import { ToastContainer } from 'react-toastify'
import TicketForm from '../../../modules/ticket/components/containers/NewTicket'

const menu = [
	{ text: 'Dashboard', icon: Dashboard, link: '/' },
	{ text: 'Tickets', icon: Ticket, link: '/tickets' },
	{ text: 'Clientes', icon: Person, link: '/clients' },
	{
		text: 'Admin', icon: Settings,
		menuItems: [
			{ text: 'Agentes', icon: <PermIdentity/>, link: '/admin/agents' },
			{ text: 'Email Support', icon: <Email/>, link: '/admin/email' },
			{ text: 'Campos del Ticket', icon: <TicketFields/>, link: '/admin/ticketFields' },
			{ text: 'Políticas SLA', icon: <Hourglass/>, link: '/admin/sla' },
			{ text: 'Horario habil', icon: <Date/>, link: '/admin/businessHours' },
			{ text: 'Automatizaciones', icon: <Laptop/>,
				menuItems: [
					{ text: 'Despachador', icon: <Truck/>, link: '/admin/agents' },
					{ text: 'Observador', icon: <Eye/>, link: '/admin/businessHours' },
					{ text: 'Supervisor', icon: <Watch/>, link: '/admin/sla' },
					{ text: 'Escenario', icon: <Tasks/>, link: '/admin/doc' }
				]
			},
			{ text: 'Colores', icon: <Palette/>, link: '/admin/palette' },
			{ text: 'Documentación del API', icon: <Library/>, link: '/admin/doc' },
		]
	}
];

@connect(null, { push })
class App extends Component {
	state = {
		navDrawerOpen: true
	};
	
	componentWillReceiveProps(nextProps) {
		if (this.props.width !== nextProps.width) {
			this.setState({ navDrawerOpen: nextProps.width === LARGE });
		}
	}
	
	handleChangeRequestNavDrawer = () => {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen
		});
	}
	
	render() {
		let { navDrawerOpen } = this.state;
		const paddingLeftDrawerOpen = 65;
		
		const styles = {
			header: {
				paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
			},
			container: {
				margin: '0.5rem',
				paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
			}
		};
		
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(ThemeDefault)}>
				<div>
					<Header headerStyles={styles.header}
					        handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
					        location={this.props.location}
					/>
					
					<LeftDrawer
						navDrawerOpen={navDrawerOpen}
						menus={menu}
						location={this.props.location}
					/>
					
					<div style={styles.container}>
						<ToastContainer
							position="bottom-center"
							type="default"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							pauseOnHover
						/>
						<Snackbar
							open={this.props.alert.open}
							message={this.props.alert.text}
							autoHideDuration={4000}
							onRequestClose={() => this.props.closeAlert()}
						/>
						<Dialog
					        title="Nuevo Ticket"
					        open={this.props.modalOpen}
					        onRequestClose={this.props.closeModal}
					        autoScrollBodyContent={true}
					    >
					    	<TicketForm />
					    </Dialog>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	children: PropTypes.element,
	width: PropTypes.number
};

export default withWidth()(App);