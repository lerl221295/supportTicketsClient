import React, { PropTypes } from 'react';
import { Drawer, Avatar, Menu, MenuItem } from 'material-ui';
import { NavigationArrowDropRight as ArrowDropRight } from 'material-ui/svg-icons'
import { spacing, typography } from 'material-ui/styles';
import { white, blue600 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import theme from '../../theme-default'

const LeftDrawer = ({ navDrawerOpen, username, menus, location }) => {
	
	/*console.log('location---', location);
	console.log('menus---', menus);*/
	
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
			div: {
				padding: '15px 0 20px 15px',
				// backgroundImage: 'url(/images/material_bg.png)',
				height: 45
			},
			icon: {
				float: 'left',
				display: 'block',
				marginRight: 15,
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
	
	return (
		<Drawer
			docked={true}
			open={navDrawerOpen}>
			<div style={styles.logo}>
				Support Admin
			</div>
			<div style={styles.avatar.div}>
				<Avatar src="/images/user.png"
				        size={50}
				        style={styles.avatar.icon}/>
				<span style={styles.avatar.span}>{username}</span>
			</div>
			<Menu autoWidth={false}>
				{menus.map(({ text, icon, link, menuItems}, index) =>
					<MenuItem
						key={index}
						style={{...styles.menuItem, backgroundColor: do {
							if (link == location.pathname) theme.palette.primary1Color
						}}}
						rightIcon={do{if(menuItems) <ArrowDropRight />}}
						menuItems={do {
							if (menuItems) {
								menuItems.map(({text, icon, link}, i) => (
									<MenuItem key={i} leftIcon={icon} primaryText={text} containerElement={<Link to={link}/>} />
								))
							}
						}}
						primaryText={text}
						leftIcon={icon}
						containerElement={<Link to={link}/>}
					/>
				)}
			</Menu>
		</Drawer>
	);
};

LeftDrawer.propTypes = {
	navDrawerOpen: PropTypes.bool,
	menus: PropTypes.array,
	username: PropTypes.string,
};

export default LeftDrawer;
