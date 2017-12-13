import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Theme from '../../theme-default'

export default ({size = 120, thickness = 5}) => (
	<Row center="xs" middle="xs" style={{height: "88vh"}}>
		<CircularProgress size={size} thickness={thickness} color={Theme.palette.primary1Color}/>
	</Row>
)