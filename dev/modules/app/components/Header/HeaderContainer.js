// React
import React from 'react'
// Apollo
import { graphql, compose } from 'react-apollo'
import Notifications from '../../graphql/querys/notifications.graphql'
import NotificationReaded from '../../graphql/mutations/notificationReaded.graphql'
import MoreNotifications from '../../graphql/subscriptions/newNotification.graphql'
// Presentationals Components
import Header from './Header'

const limit = 15;

const HeaderContainer = compose(
	graphql(Notifications, {
		options: () => ({
			variables: {
				limit
			}
		}),
		props: ({ownProps, data: { subscribeToMore, notifications, loading, error }}) => ({
			...ownProps,
			notifications,
			loading,
			error,
			subscribeToMoreNotifications: () => subscribeToMore({
				document: MoreNotifications,
				updateQuery: (prev, {subscriptionData: {newNotification}}) => {
					if (!newNotification) return prev;
					// return prev;
					return {
						...prev,
						notifications: {
							__typename: "NotificationsResponse",
							nodes: [newNotification ,...prev.notifications.nodes],
							unread_count: prev.notifications.unread_count + 1
						}
					}
				}
			})
		})
	}),
	graphql(NotificationReaded, {
		props: ({ mutate }) => ({
			notificationReaded: id => event => mutate({
				variables: { id },
				update: (proxy) => {
					try {
						const data = proxy.readQuery({
							query: Notifications,
							variables: {
								limit
							}
						});
						data.notifications.unread_count = data.notifications.unread_count - 1;
						proxy.writeQuery({ query: Notifications, data });
					}
					catch(e){
						console.log(e);
					}
				}
			})
		})
	}))(Header);

export default HeaderContainer;