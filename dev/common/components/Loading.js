import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { Grid, Row, Col } from 'react-flexbox-grid'

export default ({size = 120, thickness = 5}) => (
	<Row center="xs" middle="xs" style={{height: "88vh"}}>
		<CircularProgress size={size} thickness={thickness}/>
	</Row>
)