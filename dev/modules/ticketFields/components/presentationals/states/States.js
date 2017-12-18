import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, FlatButton, FloatingActionButton, ToolbarSeparator } from 'material-ui'
import { ContentSave as Save } from 'material-ui/svg-icons'
import StatesList from './List'
import StatesChart from './StatesChart'

export default ({states, deleteState, update}) => (
	<Paper style={{padding: "2rem"}}>
		<Row middle="xs">
			<Col xs={7}>
				<StatesList states={states} deleteState={deleteState}/>
			</Col>
			<Col xs={1}>
				<ToolbarSeparator style={{height: '36vh'}}/>
			</Col>
			<Col xs={4}>
				<StatesChart/>
			</Col>
		</Row>
		{/*<FloatingActionButton className="fab" > 
	    	<Save />
	    </FloatingActionButton>*/}
	    <FlatButton
	    	label="Guardar"
	    	fullWidth
	    	onClick={update}
	    	primary
	    />
	</Paper>
)