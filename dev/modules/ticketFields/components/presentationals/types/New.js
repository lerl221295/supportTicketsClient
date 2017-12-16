import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton, Subheader } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'

import { addType } from '../../../actions/types'

const NewType = ({handleSubmit, dirty, reset}) => (
	<Row >
		<Subheader>Nuevo Tipo de Ticket</Subheader>
		<Col xs={12}>
			<Field 
				name="key" 
				component={TextField} 
				hintText="Nombre de la Fecha Festiva"
				floatingLabelText="Codigo del tipo de ticket"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={12}>
			<Field 
				name="label" 
				component={TextField} 
				hintText="Nombre de la Fecha Festiva"
				floatingLabelText="Label de muestra"
				style={{width: "100%"}}
			/>
		</Col>
		<RaisedButton 
			disabled={!dirty}
			label="Agregar Tipo" 
			primary
			fullWidth
			onClick={e => {
				handleSubmit();
				reset();
			}} 
		/>
	</Row>
)

export default compose(
	connect(null, {onSubmit: addType}),//en este orden para reduxForm reciba el prop onSubmit
	reduxForm({form: 'newType'})
)(NewType)