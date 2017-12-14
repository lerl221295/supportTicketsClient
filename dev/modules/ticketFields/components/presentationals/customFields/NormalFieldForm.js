import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField, Toggle } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'

import { addField, closeModal } from '../../../actions/customFields'

const NewType = ({handleSubmit, dirty, reset, closeModal}) => (
	<Row bottom="xs">
		<Col xs={12}>
			<Field 
				name="key" 
				component={TextField} 
				hintText="Clave del campo"
				floatingLabelText="Key"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={12}>
			<Field 
				name="label" 
				component={TextField} 
				hintText="Label que se mostrara al usuario"
				floatingLabelText="Label de muestra"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={12}>
			<Field 
				name="clientVisible" 
				component={Toggle} 
				label="Visible para el Cliente"
				style={{padding: "1rem", width: "80%"}}
			/>
		</Col>
		<RaisedButton 
			disabled={!dirty}
			label="Agregar Campo Personalizado" 
			primary
			fullWidth
			onClick={e => {
				handleSubmit();
				reset();
				closeModal();
			}} 
		/>
	</Row>
)

export default compose(
	connect(null, {onSubmit: addField, closeModal}),//en este orden para reduxForm reciba el prop onSubmit
	reduxForm({form: 'newNormalCustomField'})
)(NewType)