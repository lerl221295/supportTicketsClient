import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

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
						<Interventions {...this.props.data.ticket} />
					</Col>
					<Col xs={3} md={3} sm={3}>
						<PropsForm
							{...this.props.data.ticketMetadata} 
							ticket={this.props.data.ticket} 
						/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default TicketDetail;