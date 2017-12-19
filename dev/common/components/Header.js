import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {Link} from 'react-router'
import { Badge, AppBar,	IconButton,	IconMenu,	MenuItem } from 'material-ui'
import {
	NavigationMoreVert as MoreVertIcon,
	NavigationMenu as Menu,
	SocialNotifications as Notification
} from 'material-ui/svg-icons'
import {white} from 'material-ui/styles/colors'
import SearchBox from './SearchBox'
import { logout } from '../utils/Authenticate'
import {Col, Row} from "react-flexbox-grid";

const GetHeaderTitle = (pathname) => {
	return (
		do {
			if (pathname === '/') {'Dashboard'} else
			if (pathname === '/tickets') {'Tickets'} else
			if (pathname.includes("tickets/")) {'Detalle del Ticket'} else
			if (pathname === '/clients') {'Clientes y Organizaciones'} else
			if (pathname === '/clients/new') {'Creación de nuevo cliente'} else
			if (pathname === '/clients/organizations/new') {'Creación de nueva organización'} else
			if (pathname.includes('/clients/organizations/')) {'Detalle y edición de organización'} else
			if (pathname.includes('/clients/')) {'Detalle y edición de cliente'} else
			if (pathname === '/admin/agents') {'Agentes, Proveedores y Grupos'} else
			if (pathname === '/admin/agents/new') {'Creación de nuevo agente'} else
			if (pathname === '/admin/agents/suppliers/new') {'Creación de nuevo proveedor'} else
			if (pathname.includes('/admin/agents/suppliers/')) {'Detalle y edición de proveedor'} else
			if (pathname === '/admin/agents/groups/new') {'Creación de nuevo grupo'} else
			if (pathname.includes('/admin/agents/groups/')) {'Detalle y edición de grupo'} else
			if (pathname.includes('/admin/agents/')) {'Detalle y edición de agente'} else
			if (pathname === '/admin/ticketFields') {'Configuraciones del Ticket'} else
			if (pathname === '/admin/sla') {'Contratos a Nivel de Servicio'} else
			if (pathname === '/admin/sla/new') {'Creación de nueva política SLA'} else
			if (pathname.includes('/admin/sla/')) {'Detalle y edición de política SLA'} else
			if (pathname === '/admin/businessHours') {'Horario operativo de la empresa'} else
			if (pathname === '/admin/doc') {'Documentación interactiva GraphiQL'}
		}
	)
};

const styles = {
	appBar: {
		maxHeight: 57
	},
	menuButton: {
		marginLeft: 10
	},
	notification: {
		badge: {
			top: 15, right: 21, fontSize: 10,	width: 20, height: 20
		},
		button: {
			paddingRight: 24, paddingTop: 15
		}
	}
};

@connect(null, { push })
class Header extends React.Component {
	
	logout = () => {
		// logout();
		this.props.push("/login");
	};
	
	componentWillMount = () => {
		this.actualSectionTitle = GetHeaderTitle(this.props.location.pathname);
	};
	
	componentWillReceiveProps = ({location: {pathname}}) => {
		this.actualSectionTitle = GetHeaderTitle(pathname);
	};
	
	render() {
		const {headerStyles, handleChangeRequestNavDrawer, location} = this.props;
		
		return (
			<Row middle={'xs'}>
				<Col xs={12}>
					<AppBar
						style={{...headerStyles, ...styles.appBar}}
						iconElementLeft={
							<IconButton style={styles.menuButton} onClick={handleChangeRequestNavDrawer}>
								<Menu color={white} />
							</IconButton>
						}
						title={this.actualSectionTitle}
						iconElementRight={
							<Row middle={'xs'} style={{ maxHeight: 57, marginTop: -4 }}>
								<Badge
									badgeContent={3}
									secondary={true}
									badgeStyle={ styles.notification.badge }
									style={styles.notification.button}
								>
									<IconMenu
										color={white}
										iconButtonElement={
											<IconButton tooltip="Notificaciones">
												<Notification color={white}/>
											</IconButton>
										}
										anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
										targetOrigin={{horizontal: 'left', vertical: 'top'}}
									>
										<MenuItem primaryText="Esta será una nofiticación" />
										<MenuItem primaryText="Esta será otra nofiticación" />
										<MenuItem primaryText="Y esta será otra nofiticación más" />
									</IconMenu>
								</Badge>
								<IconMenu
									color={white}
									iconButtonElement={
										<IconButton><MoreVertIcon color={white}/></IconButton>
									}
									anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
									targetOrigin={{horizontal: 'left', vertical: 'top'}}
								>
									<MenuItem primaryText="LogOut" onClick={this.logout}/>
								</IconMenu>
							</Row>
						}
					/>
				</Col>
			</Row>
		);
	}
}

Header.propTypes = {
	styles: PropTypes.object,
	handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
