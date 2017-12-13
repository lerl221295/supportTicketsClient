import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton} from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'

import { addType } from '../../../actions/types'

const NewType = ({handleSubmit, dirty, reset}) => (
	<Row bottom="xs">
		<Col xs={4}>
			<Field 
				name="key" 
				component={TextField} 
				//placeholder="Nombre de la Fecha Festiva"
				floatingLabelText="Codigo del tipo de ticket"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={4}>
			<Field 
				name="label" 
				component={TextField} 
				//placeholder="Nombre de la Fecha Festiva"
				floatingLabelText="Label de muestra"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={4}>
			<RaisedButton 
				disabled={!dirty}
				label="Agregar Tipo" 
				primary={true} 
				onClick={e => {
					handleSubmit();
					reset();
				}} 
			/>
		</Col>
	</Row>
)

export default compose(
	connect(null, {onSubmit: addType}),//en este orden para reduxForm reciba el prop onSubmit
	reduxForm({form: 'newType'})
)(NewType)