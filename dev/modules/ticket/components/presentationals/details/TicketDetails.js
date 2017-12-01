import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Divider } from 'material-ui'
import ClientDetails from './ClientDetails'
import Tasks from './Tasks'
import Interventions from './Interventions'
import PropsForm from '../../containers/TicketPropsForm'

class TicketDetail extends Component {
	render = () => {
		if(this.props.data.loading) return(<h1> cargando </h1>);
		//else return(<h1>{JSON.stringify(this.props.data.ticket)}</h1>);

		return(
			<div>
				<Row>
					Ticket header
				</Row>
				<Row>
					<Col xs={9} md={9} sm={9}>
						<Interventions {...this.props.data.ticket} showActivities />
					</Col>
					<Col xs={3} md={3} sm={3}>
						<ClientDetails {...this.props.data.ticket.client} />
						<br/>
						<PropsForm
							{...this.props.data.ticketMetadata} 
							ticket={this.props.data.ticket} 
						/>
						<br/>
						<Tasks tasks={this.props.data.ticket.tasks}/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default TicketDetail;