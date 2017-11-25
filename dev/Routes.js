import React, {Component} from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import App from './modules/app/components/AppContainer'
import Tickets from './modules/ticket/components/containers/TicketsContainer'
import TicketDetails from './modules/ticket/components/containers/TicketDetails'
import LoginPage from './modules/login/LoginPage'

import ClientsContainer from './modules/client/components/containers/ClientsContainer'
import CreateClient from './modules/client/components/containers/CreateClient'
import EditClient from './modules/client/components/containers/EditClient'
import CreateOrganization from './modules/client/components/containers/CreateOrganization'
import EditOrganization from './modules/client/components/containers/EditOrganization'

import AgentsContainer from './modules/agent/components/containers/AgentsContainer'
import Doc from './modules/doc/Doc'

const notFound = () => <h1> not found </h1>
class Routes extends Component {
	render = () => (
		<Router history={this.props.history}>
			<Route path="login" component={LoginPage}/>
			<Route path="/" component={App}>
				{/*<IndexRoute component={TimeLine} />*/}
				<Route path="tickets">
					<IndexRoute component={Tickets} />
					{/*<Route path=":id" component={TicketDetails}/>*/}
				</Route>
				<Route path="clients">
					<IndexRoute component={() => <ClientsContainer limit={7}/>} />
					<Route path="new" component={CreateClient}/>
					<Route path="organizations/new" component={CreateOrganization}/>
					<Route path="organizations/:id" component={EditOrganization}/>
					<Route path=":id" component={EditClient}/>
				</Route>
				<Route path="agents" component={() => <AgentsContainer limit={7}/>} />
				<Route path="doc" component={Doc} />
				<Route path="*" component={notFound}/>
			</Route>
		</Router>
	)
}

export default Routes