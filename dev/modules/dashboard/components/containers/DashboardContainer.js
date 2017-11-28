// import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import React from 'react'
import { graphql, compose } from 'react-apollo'
import Activities from '../../graphql/querys/activities.graphql'
import Indicators from '../../graphql/querys/indicators.graphql'
import TicketsCountLastWeek from '../../graphql/querys/ticketsCountLastWeek.graphql'
import Dashboard from '../presentationals/Dashboard'
import moment from 'moment';
moment.locale('es');

// export default (Dashboard);

// export default connect(null, { push })(TimeLineWithData)

const MapData = (props) => {
	// Destrucción de las variables loading
	let {activities: {loading: loadingAct}, ticketsCountByDay: {loading: loadingTic}} = props;
	if (loadingAct || loadingTic) return <Dashboard loading={true} />;
	// Si no está cargando, mapeo la data
	let {
		activities: {activities: {nodes: activities}},
		ticketsCountByDay: {ticketsCountByDay},
		indicators: {indicators}
	} = props;
	
	console.log('indicators---',indicators)
	
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
	ticketsCountByDay = ticketsCountByDay.map(({day, tickets}) => (
		{
			tickets,
			day: moment(day).format('dd D').toUpperCase(),
			// tooltip: moment(day).format('dddd Do YYYY'),
		}
	));
	return (
		<Dashboard
			loading={false}
			ticketsCountByDay={ticketsCountByDay}
			activities={mappedActivities}
			indicators={indicators}
		/>
	);
};

const DashboardContainerData = compose(
	graphql(Activities, {
		name: 'activities',
		
	}),
	graphql(Indicators, {name: 'indicators'}),
	graphql(TicketsCountLastWeek, {name: 'ticketsCountByDay'})
)(MapData);

export default DashboardContainerData;