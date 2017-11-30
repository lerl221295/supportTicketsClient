import React, { Component } from 'react'
// Material UI
import {Subheader, Divider, Paper, LinearProgress, AppBar, FlatButton, CircularProgress} from "material-ui";
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
import IndicatorBox from './IndicatorBox';
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

let indicatorsBoxs = [
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
	componentWillMount = () => {
		// console.log("subscribiendome a estas actividades: ", this.props.filter_form);
		this.props.subscribeToMoreActivities();
	};
	
	componentWillReceiveProps = nextProps => {
		// console.log("nextProps", nextProps)
	};
	
	render = () => {
		let {
			ticketsCountByDay: {loading: loadingTicketsCount},
			activities: {loading: loadingActivities},
			indicators: {loading: loadingIndicators}
		} = this.props;
		if (loadingTicketsCount || (loadingActivities && !this.props.activities.activities)|| loadingIndicators)
			return <LinearProgress mode="indeterminate"/>;
		
		let {
			ticketsCountByDay: {ticketsCountByDay},
			activities: {activities: {nodes: activities}},
			indicators: {indicators}
		} = this.props;
		
		return (
			<div>
				{/*<Col md={12}>
					<h3 style={styles.navigation}>Application / Dashboard</h3>
				</Col>*/}
				<Row between={"xs"}>
					{
						indicatorsBoxs.map((props, i) => {
							let {key, ...properties} = props;
							return (
								<Col key={i} md={2}>
									<IndicatorBox
										{...properties}
										value={indicators[key]}
									/>
								</Col>
							)
						})
					}
				</Row>
				<Row>
					{/*ACTIVIDADES RECIENTES*/}
					<Col md={6} style={{marginTop: '1rem'}}>
						<Subheader style={styles.subheader}>Actividades recientes</Subheader>
						<Paper style={{height: '27rem', overflowY: 'auto', overflowX: 'hidden'}}>
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
							<Row middle={"xs"} center={"xs"} style={{padding: '0'}}>
								<Col xs={12}>
									{
										do {
											if (loadingActivities && activities) <CircularProgress />
											else ""
										}
									}
								</Col>
							</Row>
							<Col xs={12} md={12} sm={12}>
								<FlatButton
									label="Cargar mas"
									style={{width: '100%'}}
									primary={true}
									onClick={this.props.loadMoreActivities}
									disabled={loadingActivities}
								/>
							</Col>
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
			</div>
		)
	}
}

export default Dashboard;