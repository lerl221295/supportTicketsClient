import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { Row, Col } from 'react-flexbox-grid'
import {  RaisedButton, Subheader } from 'material-ui'
import { addOption } from '../../../actions/customFields'

const NewSelectOption = ({dirty, reset, handleSubmit}) => {
	return(
		<Row top="xs">
			<Subheader>Agregar Opcion</Subheader>
			<Col xs={6}>
				<Field 
					name="key" 
					component={TextField} 
					hintText="Clave"
					floatingLabelText="Key de la Opcion"
					style={{width: "100%"}}
				/>
			</Col>
			<Col xs={6}>
				<Field 
					name="label" 
					component={TextField} 
					hintText="Nombre"
					floatingLabelText="Label de la Opcion"
					style={{width: "100%"}}
				/>
			</Col>
			<RaisedButton 
				disabled={!dirty}
				label="Agregar Opcion" 
				primary
				fullWidth
				onClick={e => {
					handleSubmit();
					reset();
				}} 
			/>
		</Row>
	)
};

export default compose(
	connect(null, { onSubmit: addOption }),
	reduxForm({form: 'newSelectOption'})
)(NewSelectOption)