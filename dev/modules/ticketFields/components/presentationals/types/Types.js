import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { RaisedButton} from 'material-ui'
import TypeList from './List'
import NewType from './New'

export default ({types, deleteType, update}) => (
	<div>
		<NewType/>
		<TypeList types={types} deleteType={deleteType} />
		<Row center="xs">
			<Col xs={4}>
				<RaisedButton 
					label="Guardar" 
					primary={true} 
					onClick={update} 
				/>
			</Col>
		</Row>
	</div>
)