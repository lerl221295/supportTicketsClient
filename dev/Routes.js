import React, {Component} from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import App from './modules/app/components/App'
import LoginPage from './modules/login/LoginPage'
import ClientsContainer from './modules/client/components/containers/ClientsContainer'
import AgentsContainer from './modules/agent/components/containers/AgentsContainer'
import Doc from './modules/doc/Doc'

const notFound = () => <h1> not found </h1>
class Routes extends Component {
	render = () => (
		<Router history={this.props.history}>
			<Route path="login" component={LoginPage}/>
			<Route path="/" component={App}>
				{/*<IndexRoute component={TimeLine} />
				<Route path="tickets">
					<IndexRoute component={Tickets} />
					<Route path=":id" component={TicketDetail}/>
				</Route>
				<Route path="tecnicos" component={TecnicosContainer} />*/}
				<Route path="clients" component={() => <ClientsContainer limit={7}/>} />
				<Route path="agents" component={() => <AgentsContainer limit={8}/>} />
				<Route path="doc" component={Doc} />
				<Route path="*" component={notFound}/>
			</Route>
		</Router>
	)
}

export default Routes