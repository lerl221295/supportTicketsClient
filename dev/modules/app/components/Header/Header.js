import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import { Badge, AppBar,	IconButton,	IconMenu, MenuItem, Divider } from 'material-ui'
import {
	NavigationMoreVert as MoreVertIcon,
	NavigationMenu as Menu,
	SocialNotifications as Notification,
	ImagePanoramaFishEye as Readed,
	ImageLens as Unread,
	NotificationConfirmationNumber as NewTicket
} from 'material-ui/svg-icons'
import {white} from 'material-ui/styles/colors'
import { SearchBox, TimeAgo } from '../../../../common/components'
import hexToRgbA from '../../../../common/utils/hexToRgbA'
import { logout } from '../../../../common/utils/Authenticate'
import {Col, Row} from 'react-flexbox-grid'
import theme from '../../../../theme-default'
import GetHeaderTitle from '../../utils/GetHeaderTitle'

const GetMenuItemStyle = (readed) => {
	return ({
		backgroundColor: do {
			if (!readed) {hexToRgbA(theme.palette.primary3Color, 0.4)}
		},
		whiteSpace: 'normal',
		lineHeight: '20px'
	})
}

const styles = {
	appBar: {
		maxHeight: 57
	},
	notification: {
		row: {
			maxHeight: 57, marginTop: -4
		},
		badge: {
			top: 15, right: 21, fontSize: 10,	width: 20, height: 20
		},
		button: {
			paddingRight: 24, paddingTop: 15
		},
		readedButton: {
			width: 12,
			height: 12,
		},
		menuItemRow: {
			maxWidth: '35rem',
			padding: '0.8rem'
		},
		timeAgo: {
			fontSize: '0.8rem',
			fontWeight: 500,
			color: theme.palette.secondaryTextColor
		}
	}
};

class Header extends React.Component {
	
	logout = () => {
		// logout();
		this.props.push("/login");
	};
	
	componentWillMount = () => {
		this.props.subscribeToMoreNotifications();
	};
	
	render() {
		
		this.actualSectionTitle = GetHeaderTitle(this.props.location.pathname);
		
		const { headerStyles, location, loading, notificationReaded } = this.props;
		
		let {notifications, unread_count} = do {
			if (!loading) ({
				notifications: this.props.notifications.nodes,
				unread_count: this.props.notifications.unread_count
			})
			else ({notifications: [], unread_count: 0})
		};

		return (
			<Row middle={'xs'}>
				<Col xs={12}>
					<AppBar
						style={{...headerStyles, ...styles.appBar}}
						iconStyleLeft={{display: 'none'}}
						titleStyle={{marginLeft: '1rem'}}
						title={this.actualSectionTitle}
						iconElementRight={
							<Row middle={'xs'} style={styles.notification.row}>
								<IconButton 
									tooltip="Nuevo Ticket"
									onClick={this.props.openModal}
								>
									<NewTicket color={white} />
								</IconButton>
								{
									!loading &&
									<Badge
										badgeContent={unread_count}
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
											maxHeight={400}
											touchTapCloseDelay={0}
											onClick={null}
										>
											{notifications.map(({id, text, readed, time, ticket: {number, title}}, i) => (
												<MenuItem
													key={i}
													style={GetMenuItemStyle(readed)}
												>
													<Row middle={'xs'} style={styles.notification.menuItemRow}>
														<Col xs={11}>
															<Col xs={12}>
																{text} <Link to={`/tickets/${number}`}>Ticket (#{number})</Link>
															</Col>
															<Col xs={12}>
																<TimeAgo date={time} style={styles.notification.timeAgo}/>
															</Col>
														</Col>
														<Col xs={1}>
															<IconButton
																iconStyle={styles.notification.readedButton}
																tooltip={do{
																	if (!readed) {'Marcar como leída'}
																	else {'Notificación leída'}
																}}
																onClick={ do {
																	if (!readed) notificationReaded(id)
																}}
															>
																{do {
																	if (readed) <Readed color={theme.palette.secondaryTextColor}/>
																	else <Unread color={theme.palette.secondaryTextColor}/>
																}}
															</IconButton>
														</Col>
													</Row>
													<Divider />
												</MenuItem>
											))}
										</IconMenu>
									</Badge>
								}
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
