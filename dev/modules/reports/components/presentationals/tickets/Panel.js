import React, { Component } from 'react'
import { Col, Row } from "react-flexbox-grid"
import { Paper } from 'material-ui'

import SelectRange from '../SelectRange'
import Reports from '../../containers/TicketsReport'

export default () => {
	return(
		<div style={{padding: "1rem"}}>
			<Row center="xs" style={{marginBottom: "1rem"}}>
				<Col><SelectRange/></Col>
			</Row>
			<Row>
				<Reports/>
			</Row>
		</div>
	)
}