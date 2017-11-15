import React, {Component} from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import App from './components/App'
import LoginPage from './containers/LoginPage'
import TimeLine from './containers/TimeLine'
import Tickets from './containers/Tickets'
import TicketDetail from './containers/DetailsTicket'
import TecnicosPanel from './containers/TecnicosPanel'
import ClientesPanel from './containers/ClientesPanel'
import Doc from './components/Doc'

const notFound = () => <h1> not found </h1>
class Routes extends Component {
	render = () => (
		<Router history={this.props.history}>
			<Route path="login" component={LoginPage}/>
    		<Route path="/" component={App}>
				<IndexRoute component={TimeLine} />
				<Route path="tickets">
					<IndexRoute component={Tickets} />
					<Route path=":id" component={TicketDetail}/>
				</Route>
				<Route path="tecnicos" component={TecnicosPanel} />
				<Route path="clients" component={ClientesPanel} />
				<Route path="doc" component={Doc} />
				<Route path="*" component={notFound}/>
		    </Route>
    	</Router>
	)
}

export default Routes