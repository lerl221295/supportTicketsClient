import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton, MenuItem } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField, SelectField, Toggle } from 'redux-form-material-ui'
import { Field } from 'redux-form'

const renderOptions = states => states.map(({key, label}) => (
	<MenuItem key={key} value={key} primaryText={label}/>
))

export default ({handleSubmit, dirty, reset, closeModal, states}) => (
	<Row bottom="xs">
		<Col xs={6}>
			<Field 
				name="key" 
				component={TextField} 
				hintText="Clave del Estado"
				floatingLabelText="Key"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={6}>
			<Field 
				name="sla_paused" 
				component={Toggle} 
				label="Pausa el SLA"
				style={{padding: "1rem", width: "80%"}}
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
				name="stage" 
				component={SelectField} 
				floatingLabelText="Etapa"
				style={{padding: "1rem", width: "80%"}}
			>
				<MenuItem value="PREPARATION" primaryText="Preparacion"/>
				<MenuItem value="PROGRESS" primaryText="Progreso"/>
				<MenuItem value="END" primaryText="Final"/>
			</Field>
		</Col>
		<Col xs={12}>
			<Field 
				name="came_from" 
				component={SelectField} 
				multiple
				floatingLabelText="Estados de donde viene"
				style={{padding: "1rem", width: "80%"}}
			>
				{renderOptions(states)}
			</Field>
		</Col>
		<RaisedButton 
			disabled={!dirty}
			label="Guardar" 
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