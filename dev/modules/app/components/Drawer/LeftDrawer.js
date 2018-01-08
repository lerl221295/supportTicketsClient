import React, { PropTypes } from 'react';
import { Drawer, Avatar, Menu, MenuItem, IconButton } from 'material-ui';
import { NavigationArrowDropRight as ArrowDropRight } from 'material-ui/svg-icons'
import { spacing, typography } from 'material-ui/styles';
import { white, blue600 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { Row, Col } from 'react-flexbox-grid'
import theme from '../../../../theme-default'

const styles = {
	logo: {
		cursor: 'pointer',
		fontSize: 22,
		color: theme.palette.alternateTextColor,
		lineHeight: `${spacing.desktopKeylineIncrement}px`,
		fontWeight: typography.fontWeightLight,
		backgroundColor: theme.palette.primary1Color,
		paddingLeft: 40,
		height: 56,
	},
	menuItem: {
		color: white,
		fontSize: 14
	},
	avatar: {
		icon: {
			marginTop: '0.6rem',
			boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
		},
		span: {
			paddingTop: 12,
			display: 'block',
			color: 'white',
			fontWeight: 300,
			textShadow: '1px 1px #444'
		}
	}
};

const LeftDrawer = ({ navDrawerOpen, menus, location: {pathname} }) => {
	return (
		<Drawer
			open={navDrawerOpen}
		>
			<Row center={'xs'} style={{margin: 0}}>
				<Col xs={12}>
					<Avatar src="/images/user.png"
					        size={50}
					        style={styles.avatar.icon}
					/>
				</Col>
			</Row>
			{menus.map(({ text, icon: Icon, link, menuItems}, index) =>
				<MenuItem
					key={index}
					style={{...styles.menuItem, backgroundColor: do {
						if (pathname === link || (_.isUndefined(link) && pathname.includes('/admin/')))
							theme.palette.primary1Color
					}}}
					menuItems={do {
						if (menuItems) {
							menuItems.map(({text, icon, link, menuItems}, i) => (
								<MenuItem
									key={i} leftIcon={icon}
									primaryText={text} containerElement={<Link to={link}/>}
									menuItems={do {
										if (menuItems) {
											menuItems.map(({text, icon, link, menuItems}, i) => (
												<MenuItem key={i} leftIcon={icon} primaryText={text} containerElement={<Link to={link}/>} />
											))
										}
									}}
									rightIcon={do{if(menuItems) <ArrowDropRight />}}
								/>
							))
						}
					}}
				>
					<Row center={'xs'} middle={'xs'}>
						<IconButton tooltip={text}>
							<Link to={link}>
								<Icon color={theme.palette.alternateTextColor} />
							</Link>
						</IconButton>
					</Row>
				</MenuItem>
			)}
		</Drawer>
	);
};

LeftDrawer.propTypes = {
	navDrawerOpen: PropTypes.bool,
	menus: PropTypes.array
};

export default LeftDrawer;
