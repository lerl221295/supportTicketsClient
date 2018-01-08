import React, { Component } from 'react'
import { Col, Row } from "react-flexbox-grid"
import { Paper } from 'material-ui'

import SelectRange from '../SelectRange'
import SelectOrganizations from './SelectOrganizations'
import Reports from '../../containers/ComplianceReport'

export default () => {
	return(
		<div style={{padding: "1rem"}}>
			<Row center="xs" style={{marginBottom: "1rem"}}>
				<Col xs={4}><SelectRange/></Col>
				<Col xs={8}><SelectOrganizations/></Col>
			</Row>
			<Row>
				<Reports/>
			</Row>
		</div>
	)
}