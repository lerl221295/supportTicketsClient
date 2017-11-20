import React, {Component} from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import App from './components/presentationals/App'
import LoginPage from './components/containers/LoginPage'
import ClientsContainer from './components/containers/Clients/ClientsContainer'
import AgentsContainer from './components/containers/Agents/AgentsContainer'
import Doc from './components/presentationals/Doc'

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
				<Route path="clients" component={() => <ClientsContainer limit={8}/>} />
				<Route path="agents" component={() => <AgentsContainer limit={8}/>} />
				<Route path="doc" component={Doc} />
				<Route path="*" component={notFound}/>
			</Route>
		</Router>
	)
}

export default Routes