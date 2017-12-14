import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, FlatButton, FloatingActionButton, ToolbarSeparator } from 'material-ui'
import { ContentSave as Save } from 'material-ui/svg-icons'
import TypeList from './List'
import NewType from './New'

export default ({types, deleteType, update}) => (
	<Paper style={{padding: "2rem"}}>
		<Row middle="xs">
			<Col xs={7}>
				<TypeList types={types} deleteType={deleteType} />
			</Col>
			<Col xs={1}>
				<ToolbarSeparator style={{height: '36vh'}}/>
			</Col>
			<Col xs={4}>
				<NewType/>
			</Col>
		</Row>
		{/*<FloatingActionButton className="fab" onClick={update}> 
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