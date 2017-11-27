import React, { Component } from 'react'
// Material UI
import {Subheader, Divider, Paper, LinearProgress} from "material-ui";
import {List, ListItem} from 'material-ui/List'
import {typography} from 'material-ui/styles';
// Colores
import {grey600, red600, yellow600, green600, blue600, teal400, cyan600, white} from 'material-ui/styles/colors';
// Íconos
import Face from 'material-ui/svg-icons/action/face';
import Warning from 'material-ui/svg-icons/alert/warning';
import TimerOff from 'material-ui/svg-icons/image/timer-off';
import Timelapse from 'material-ui/svg-icons/image/timelapse';
import Receipt from 'material-ui/svg-icons/action/receipt';
import Timer from 'material-ui/svg-icons/image/timer';
import Avatar from 'material-ui/Avatar'
// Flexbox Grid
import { Row, Col } from 'react-flexbox-grid';
// Components
import InfoBox from './InfoBox';
import Item from './ItemListActivity'

const styles = {
	subheader: {
		fontSize: 24,
		fontWeight: typography.fontWeightLight,
		backgroundColor: cyan600,
		color: white
	},
	navigation:{
		fontSize: 15,
		fontWeight: typography.fontWeightLight,
		color: grey600,
		paddingBottom: 15,
		display: 'block'
	}
};


const infoBoxs = [
	{
		icon: Warning,
		color: grey600,
		title: 'Sin solucionar',
		value: '20'
	},
	{
		icon: TimerOff,
		color: red600,
		title: 'Atrasado',
		value: '5'
	},
	{
		icon: Timelapse,
		color: yellow600,
		title: 'Vencido hoy',
		value: '3'
	},
	{
		icon: Receipt,
		color: green600,
		title: 'Abierto',
		value: '10'
	},
	{
		icon: Timer,
		color: blue600,
		title: 'En espera',
		value: '7'
	},
	{
		icon: Face,
		color: teal400,
		title: 'No asignado',
		value: '5'
	},
];

class Dashboard extends Component {
	/*componentWillMount = () => {
		let { subscribeToMore } = this.props.data;
		subscribeToMore({
			document: newInteracciones,
			updateQuery: (prev, {subscriptionData}) => {
				if (!subscriptionData.newInteracciones) return prev;
				const newInteraccion = subscriptionData.newInteracciones;
				return Object.assign({}, prev, {
					ultimasInteracciones: [newInteraccion, ...prev.ultimasInteracciones],
				});
			}
		})
	};*/
	
	/*constructor (props) {
		super(props);
	}
	
	componentWillReceiveProps = (nextProps) => {
		console.log("Props---- ", nextProps)
	}*/
	
	render = () => {
		let {data: {loading}} = this.props;
		if (loading) return <LinearProgress mode="indeterminate"/>;
		
		let {activities: {nodes: activities}} = this.props.data;
		let mappedActivities = [];
		
		for (const act of activities) {
			let {actions, ...activity} = act;
			mappedActivities = [...mappedActivities, ...actions.map(action => (
				{
					...activity,
					action
				}
			))];
		}
		console.log("------", mappedActivities);
		
		
		return (
			<Row>
				<Col md={12}>
					<h3 style={styles.navigation}>Application / Dashboard</h3>
				</Col>
				<Col md={12}>
					<Row between={"xs"}>
						{infoBoxs.map(({icon, color, title, value}, i) => (
							<Col key={i} md={2}>
								<InfoBox
									Icon={icon}
									color={color}
									title={title}
									value={value}
								/>
							</Col>
						))}
					</Row>
				</Col>
				<Col md={6}>
					<Paper>
						<List>
							<Subheader style={styles.subheader}>Actividades recientes</Subheader>
							{mappedActivities.map((activity, i) =>
								<div key={i}>
									<ListItem
										containerElement={<Item {...activity}/>}
									/>
									<Divider />
								</div>
							)}
						</List>
					</Paper>
				</Col>
			</Row>
		)
	}
}

export default Dashboard;