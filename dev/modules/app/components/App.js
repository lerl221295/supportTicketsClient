import React, { Component, PropTypes } from 'react'
// React-Redux
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// Material-UI Components
import {Snackbar} from 'material-ui'
// Material-UI Utils
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth'
// Material-UI Theme config
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ThemeDefault from '../../../theme-default'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Common Components
import {Header, LeftDrawer} from '../../../common/components'
// Icons
import {
	FileCloudQueue as Doc,
	ActionTimeline as TimeLine,
	ActionBuild as Llave,
	ActionPermIdentity as PermIdentity,
	NotificationConfirmationNumber as Ticket
} from 'material-ui/svg-icons/index'
// import { getUser } from '../../utils/Authenticate'
import { ToastContainer } from 'react-toastify'

const menu = [
	{ text: 'TimeLine', icon: <TimeLine/>, link: '/' },
	{ text: 'Tickets', icon: <Ticket/>, link: '/tickets' },
	{ text: 'Tecnicos', icon: <Llave/>, link: '/agents' },
	{ text: 'Clientes', icon: <PermIdentity/>, link: '/clients' },
	{ text: 'Políticas SLA', icon: <Doc/>, link: '/sla' },
	{ text: 'Horario habil', icon: <PermIdentity/>, link: '/admin/businessHours' },
	{ text: 'Doc', icon: <Doc/>, link: '/doc' }
];

@connect(null, { push })
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navDrawerOpen: true
		};
	}
	
	componentWillReceiveProps(nextProps) {
		if (this.props.width !== nextProps.width) {
			this.setState({ navDrawerOpen: nextProps.width === LARGE });
		}
	}
	
	handleChangeRequestNavDrawer() {
		this.setState({
			navDrawerOpen: !this.state.navDrawerOpen
		});
	}
	
	render() {
		let { navDrawerOpen } = this.state;
		const paddingLeftDrawerOpen = '14.75rem';
		
		const styles = {
			header: {
				paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
			},
			container: {
				margin: '0.5rem 0.5rem 0.5rem 0',
				paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
			}
		};
		
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(ThemeDefault)}>
				<div>
					<Header styles={styles.header}
					        handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>
					
					<LeftDrawer navDrawerOpen={navDrawerOpen}
					            menus={menu}
					            username="Tesis SaaS"/>
					
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