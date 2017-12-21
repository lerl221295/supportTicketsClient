import React, { Component } from 'react'
// Material UI
import {LinearProgress} from "material-ui";
import {typography} from 'material-ui/styles';
// Colores
import {grey600, red600, yellow600, green600, blue600, teal400} from 'material-ui/styles/colors';
// Íconos
import Face from 'material-ui/svg-icons/action/face';
import Warning from 'material-ui/svg-icons/alert/warning';
import TimerOff from 'material-ui/svg-icons/image/timer-off';
import Timelapse from 'material-ui/svg-icons/image/timelapse';
import Receipt from 'material-ui/svg-icons/action/receipt';
import Timer from 'material-ui/svg-icons/image/timer';
// Flexbox Grid
import { Row, Col } from 'react-flexbox-grid';
// Components
import IndicatorBox from './IndicatorBox';
import RecentActivities from './RecentActivities'
import TicketsLast7Days from './TicketsLast7Days'

const styles = {
	indicatorsBar: {
		marginBottom: '1rem'
	}
};

let indicatorsBoxs = [
	{
		icon: Warning,
		color: grey600,
		key: 'unresolved',
		title: 'Sin solucionar',
		criteria: "state=unresolved"
	},
	{
		icon: TimerOff,
		color: red600,
		key: 'overdue',
		title: 'Atrasado',
		criteria: "due_by=OVERDUE"
	},
	{
		icon: Timelapse,
		color: yellow600,
		key: 'due_today',
		title: 'Vencido hoy',
		criteria: "due_by=TODAY"
	},
	{
		icon: Receipt,
		color: green600,
		key: 'open',
		title: 'Nuevo',
		criteria: "state=new"
	},
	{
		icon: Timer,
		color: blue600,
		key: 'on_hold',
		title: 'En espera',
		criteria: "state=pending"
	},
	{
		icon: Face,
		color: teal400,
		key: 'unassigned',
		title: 'No asignado',
		criteria: "unassigned"
	},
];

class Dashboard extends Component {
	componentWillMount = () => {
		this.props.subscribeToMoreActivities();
	};
	
	render = () => {
		let {
			ticketsCountByDay: {loading: loadingTicketsCount, ticketsCountByDay},
			activities: {loading: loadingActivities, activities: activitiesPaginated},
			indicators: {loading: loadingIndicators, indicators}
		} = this.props;
		if (loadingTicketsCount || (loadingActivities && !activitiesPaginated)|| loadingIndicators)
			return <LinearProgress mode="indeterminate"/>;
		
		let { nodes: activities } = activitiesPaginated;
		
		return (
			<div>
				{/*BARRA DE INDICADORES*/}
				<Row between={"xs"} style={styles.indicatorsBar}>
					{
						indicatorsBoxs.map((props, i) => {
							let {key, criteria, ...properties} = props;
							return (
								<Col key={i} md={2}>
									<IndicatorBox
										{...properties}
										value={indicators[key]}
										goToTickets={() => this.props.push(`tickets?${criteria}`)}
									/>
								</Col>
							)
						})
					}
				</Row>
				<Row>
					{/*ACTIVIDADES RECIENTES*/}
					<Col md={6}>
						<RecentActivities
							loadingActivities={loadingActivities}
							activities={activities}
							loadMoreActivities={this.props.loadMoreActivities}
						/>
					</Col>
					{/*GRÁFICO DE NUEVOS TICKETS EN LAS ULTIMOS 7 DIAS*/}
					<Col md={6}>
						<TicketsLast7Days
							ticketsCountByDay={ticketsCountByDay}
						/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Dashboard;