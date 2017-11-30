// import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import React from 'react'
import { graphql, compose } from 'react-apollo'
import Activities from '../../graphql/querys/activities.graphql'
import Indicators from '../../graphql/querys/indicators.graphql'
import TicketsCountLastWeek from '../../graphql/querys/ticketsCountLastWeek.graphql'
import MoreActivities from '../../graphql/subscriptions/newActivities.graphql'
import Dashboard from '../presentationals/Dashboard'
import moment from 'moment';
moment.locale('es');

// export default (Dashboard);

// export default connect(null, { push })(TimeLineWithData)

const limit = 10;
const DashboardContainerData = compose(
	graphql(Activities, {
		name: 'activities',
		options: () => ({
			variables: {
				limit
			},
			notifyOnNetworkStatusChange: true
		}),
		props: ({ownProps, activities: {fetchMore, refetch, subscribeToMore, activities, loading, error}}) => {
			// let {activities:{activities}} = props;
			// console.log("----", activities);
			return({
				activities: {
					...ownProps,
					activities,
					loading,
					error
				},
				refetchActivities: () => refetch({ limit }),
				loadMoreActivities: () => fetchMore({
					variables: {
						limit,
						offset: activities.nodes.length
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						console.log("previousResult", previousResult)
						console.log("more query", fetchMoreResult)
						// return previousResult;
						if (!fetchMoreResult) return previousResult;
						return Object.assign({}, previousResult, {
							activities: {
								__typename: "ActivitiesResponse",
								nodes: [...previousResult.activities.nodes, ...fetchMoreResult.activities.nodes]
							}
						});
					}
				}),
				subscribeToMoreActivities: (ticket_number) => subscribeToMore({
					document: MoreActivities,
					variables: { ticket_number },
					updateQuery: (prev, {subscriptionData}) => {
						console.log('subscriptionData', subscriptionData);
						console.log('prev', prev);
						if (!subscriptionData.newActivity) return prev;
						
						const { newActivity } = subscriptionData;
						
						return Object.assign({}, prev, {
							activities: {
								__typename: "ActivitiesResponse",
								nodes: [newActivity ,...prev.activities.nodes]
							}
						});
					}
				})
			})
		}
	}),
	graphql(TicketsCountLastWeek, {
		name: 'ticketsCountByDay',
		props: ({ ticketsCountByDay: { ticketsCountByDay, loading, error } }) => {
			// console.log("ticketsCountByDay---", ticketsCountByDay);
			if (ticketsCountByDay) {
				ticketsCountByDay = ticketsCountByDay.map(({day, tickets}) => (
					{
						tickets,
						day: moment(new Date(day)).format('dd D').toUpperCase(),
						// tooltip: moment(day).format('dddd Do YYYY'),
					}
				));
			}
			return({
				ticketsCountByDay: {
					ticketsCountByDay,
					loading,
					error
				}
			})
		}
	}),
	graphql(Indicators, {name: 'indicators'})
)(Dashboard);

export default DashboardContainerData;