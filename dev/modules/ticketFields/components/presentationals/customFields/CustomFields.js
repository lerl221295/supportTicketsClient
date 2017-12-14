import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, FlatButton, ToolbarSeparator } from 'material-ui'
import CustomFieldsList from './List'
import NewCustomFields from './New'

class CustomFields extends Component {
	render = () => {
		const {custom_fields, deleteField, update, onDragEnd, getItemStyle} = this.props;
		return(
			<Paper style={{padding: "2rem"}}>
				<Row middle="xs">
					<Col xs={7}>
						<CustomFieldsList 
							custom_fields={custom_fields} 
							deleteField={deleteField}
							onDragEnd={onDragEnd}
							getItemStyle={getItemStyle}
						/>
					</Col>
					<Col xs={1}>
						<ToolbarSeparator style={{height: '60vh'}}/>
					</Col>
					<Col xs={4}>
						<NewCustomFields/>
					</Col>
				</Row>
			    <FlatButton
			    	label="Guardar"
			    	fullWidth
			    	onClick={update}
			    	primary
			    />
			</Paper>
		)
	}
}

export default CustomFields 