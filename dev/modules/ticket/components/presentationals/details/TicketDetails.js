import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Divider } from 'material-ui'
import ClientDetails from './ClientDetails'
import Tasks from './Tasks'
import Interventions from '../../containers/InterventionList'
import Header from '../../containers/Header'
import Reply from '../../containers/Reply'
import PropsForm from '../../containers/TicketPropsForm'
import { Loading } from '../../../../../common/components'

class TicketDetail extends Component {
	render = () => {
		if(this.props.data.loading) return <Loading />;

		return(
			<div>
				<Row>
					<Col xs={12} md={12} sm={12}>
						<Header />
					</Col>
				</Row>
				<Row>
					<Col xs={9} md={9} sm={9}>
						<Interventions {...this.props.data.ticket} />
						<Reply 
							ticket_number={this.props.routeParams.number}
							client={this.props.data.ticket.client}
						/>
					</Col>
					<Col xs={3} md={3} sm={3}>
						<ClientDetails {...this.props.data.ticket.client} />
						<br/>
						<PropsForm
							ticket_number={this.props.routeParams.number}//solo por la data mock
							{...this.props.data.ticketMetadata} 
							ticket={this.props.data.ticket} 
						/>
						<br/>
						<Tasks 
							tasks={this.props.data.ticket.tasks}
							addTask={this.props.addTask}
							checkTask={this.props.checkTask}
						/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default TicketDetail;