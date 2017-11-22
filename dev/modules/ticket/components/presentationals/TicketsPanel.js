import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import TicketsFilter from './TicketsFilters'
import TicketsList from '../containers/TicketsList'

class TicketsPanel extends Component {
	render = () => {
		return(
			<Row>
				<Col md={4}>
					<TicketsFilter onSubmit={(values) => console.log(values)} />
				</Col>
				<Col md={8}>
					<TicketsList/>
				</Col>
			</Row>
		)
	}
}

export default TicketsPanel