// React & Redux
import React from 'react'
import { connect } from 'react-redux'
// Apollo
import { graphql, compose } from 'react-apollo'
import Activities from '../../graphql/querys/activities.graphql'
import Indicators from '../../graphql/querys/indicators.graphql'
import TicketsCountLastWeek from '../../graphql/querys/ticketsCountLastWeek.graphql'
import MoreActivities from '../../graphql/subscriptions/newActivities.graphql'
// External Libraries
import { push } from 'react-router-redux'
import moment from 'moment';
moment.locale('es');
// Presentationals Components
import Dashboard from '../presentationals/Dashboard'

/**
 * Límite de actividades que traerá del servidor
 * @type {number}
 */
const limit = 10;
/**
 * Componente contenedor del dashboard
 */
const DashboardContainer = compose(
	graphql(Activities, {
		name: 'activities',
		options: () => ({
			variables: {
				limit
			},
			notifyOnNetworkStatusChange: true
		}),
		props: ({ownProps, activities: {fetchMore, refetch, subscribeToMore, activities, loading, error}}) => {
			return({
				activities: {
					...ownProps,
					activities,
					loading,
					error
				},
				// refetchActivities: () => refetch({ limit }),
				loadMoreActivities: () => fetchMore({
					variables: {
						limit,
						offset: activities.nodes.length
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						if (!fetchMoreResult) return previousResult;
						return {
							...previousResult,
							activities: {
								__typename: "ActivitiesResponse",
								nodes: [...previousResult.activities.nodes, ...fetchMoreResult.activities.nodes]
							}
						}
					}
				}),
				subscribeToMoreActivities: (ticket_number) => subscribeToMore({
					document: MoreActivities,
					variables: { ticket_number },
					updateQuery: (prev, {subscriptionData: {newActivity}}) => {
						console.log(newActivity);
						if (!newActivity) return prev;
						return {
							...prev,
							activities: {
								__typename: "ActivitiesResponse",
								nodes: [newActivity ,...prev.activities.nodes]
							}
						}
					}
				})
			})
		}
	}),
	graphql(TicketsCountLastWeek, {
		name: 'ticketsCountByDay',
		props: ({ ticketsCountByDay: { ticketsCountByDay, loading, error } }) => {
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
	graphql(Indicators, {name: 'indicators'}),
	connect(null, { push })
)(Dashboard);

export default DashboardContainer;