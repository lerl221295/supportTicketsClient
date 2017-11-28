import React, { Component } from 'react'
// Material UI
import {Subheader, Divider, Paper, LinearProgress, AppBar} from "material-ui";
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
// Recharts
import {
	LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart,	Bar
} from 'recharts';
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

let infoBoxs = [
	{
		icon: Warning,
		color: grey600,
		key: 'unresolved',
		title: 'Sin solucionar'
	},
	{
		icon: TimerOff,
		color: red600,
		key: 'overdue',
		title: 'Atrasado'
	},
	{
		icon: Timelapse,
		color: yellow600,
		key: 'due_today',
		title: 'Vencido hoy'
	},
	{
		icon: Receipt,
		color: green600,
		key: 'open',
		title: 'Abierto'
	},
	{
		icon: Timer,
		color: blue600,
		key: 'on_hold',
		title: 'En espera'
	},
	{
		icon: Face,
		color: teal400,
		key: 'unassigned',
		title: 'No asignado'
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
	}*/
	
	/*componentWillReceiveProps = (nextProps) => {
		console.log("Props---- ", nextProps)
	};*/
	
	render = () => {
		let {loading} = this.props;
		if (loading) return <LinearProgress mode="indeterminate"/>;
		
		let {ticketsCountByDay, activities, indicators} = this.props;
		
		return (
			<Row>
				{/*<Col md={12}>
					<h3 style={styles.navigation}>Application / Dashboard</h3>
				</Col>*/}
				<Col md={12}>
					<Row between={"xs"}>
						{
							infoBoxs.map((props, i) => {
								let {key, ...properties} = props;
								return (
									<Col key={i} md={2}>
										<InfoBox
											{...properties}
											value={indicators[key]}
										/>
									</Col>
								)
							})
						}
					</Row>
				</Col>
				{/*ACTIVIDADES RECIENTES*/}
				<Col md={6} style={{marginTop: '1rem'}}>
					<Subheader style={styles.subheader}>Actividades recientes</Subheader>
					<Paper style={{height: '27rem', overflowY: 'auto'}}>
						<List>
							{activities.map((activity, i) =>
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
				{/*GRÁFICO DE NUEVOS TICKETS EN LAS ULTIMOS 10 DIAS*/}
				<Col md={6} style={{marginTop: '1rem'}}>
					<Subheader style={styles.subheader}>Tickets creados en los últimos 7 días</Subheader>
					<Paper style={{height: '27rem'}}>
						<ResponsiveContainer >
							<BarChart data={ticketsCountByDay}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="day" />
								<YAxis />
								<Tooltip payload={ticketsCountByDay}/>
								<Bar type="monotone" dataKey="tickets" fill="#8884d8" barSize={10}/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Col>
			</Row>
		)
	}
}

export default Dashboard;