import React, {Component} from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import App from './modules/app/components/AppContainer'
import Tickets from './modules/ticket/components/containers/TicketsContainer'
import TicketDetails from './modules/ticket/components/containers/TicketDetails'
//import LoginPage from './modules/login/LoginPage'

import ClientsContainer from './modules/client/components/containers/ClientsContainer'
import CreateClient from './modules/client/components/containers/CreateClient'
import EditClient from './modules/client/components/containers/EditClient'
import CreateOrganization from './modules/client/components/containers/CreateOrganization'
import EditOrganization from './modules/client/components/containers/EditOrganization'

import AgentsContainer from './modules/agent/components/containers/AgentsContainer'
import CreateAgent from './modules/agent/components/containers/CreateAgent'
import EditAgent from './modules/agent/components/containers/EditAgent'
import CreateSupplier from './modules/agent/components/containers/CreateSupplier'
import EditSupplier from './modules/agent/components/containers/EditSupplier'
import EditGroup from './modules/agent/components/containers/EditGroup'
import CreateGroup from './modules/agent/components/containers/CreateGroup'

import SlaPolicies from './modules/slaPolicies/components/containers/SLAPoliciesApolloContainer'
import CreateSLAPolicy from './modules/slaPolicies/components/containers/CreateSLAPolicy'

import BusinessHours from './modules/businessHours/components/containers/EditBusinessHours'

import DashboardContainer from './modules/dashboard/components/containers/DashboardContainer'
import Doc from './modules/doc/Doc'

const notFound = () => <h1> not found </h1>
class Routes extends Component {
	render = () => (
		<Router history={this.props.history}>
			{/*<Route path="login" component={LoginPage}/>*/}
			<Route path="/" component={App}>
				<IndexRoute component={DashboardContainer} />
				<Route path="tickets">
					<IndexRoute component={Tickets} />
					<Route path=":number" component={TicketDetails}/>
				</Route>
				<Route path="clients">
					<IndexRoute component={ClientsContainer} />
					<Route path="new" component={CreateClient}/>
					<Route path="organizations/new" component={CreateOrganization}/>
					<Route path="organizations/:id" component={EditOrganization}/>
					<Route path=":id" component={EditClient}/>
				</Route>
				<Route path="agents">
					<IndexRoute component={AgentsContainer} />
					<Route path="new" component={CreateAgent}/>
					<Route path="suppliers/new" component={CreateSupplier}/>
					<Route path="suppliers/:id" component={EditSupplier}/>
					<Route path="groups/new" component={CreateGroup}/>
					<Route path="groups/:id" component={EditGroup}/>
					<Route path=":id" component={EditAgent}/>
				</Route>
				<Route path="admin">
					<Route path="businessHours" component={BusinessHours}/>
					<Route path="sla">
						<IndexRoute component={SlaPolicies} />
						<Route path="new" component={CreateSLAPolicy}/>
					</Route>
				</Route>
				<Route path="doc" component={Doc} />
				<Route path="*" component={notFound}/>
			</Route>
		</Router>
	)
}

export default Routes