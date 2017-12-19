import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton, MenuItem } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField, SelectField, Toggle } from 'redux-form-material-ui'
import { Field } from 'redux-form'
import { FormButtonGroup } from '../../../../../common/components'

const renderOptions = states => Array.from(states).filter(state => state.stage !== "END")
	.map(({key, label}) => (
		<MenuItem key={key} value={key} primaryText={label}/>
	))

export default ({handleSubmit, dirty, reset, closeModal, states, editing, stage}) => (
	<Row bottom="xs">
		<Col xs={6}>
			<Field 
				name="key" 
				component={TextField} 
				hintText="Clave del Estado"
				floatingLabelText="Key"
				style={{width: "100%"}}
				disabled={
					editing && 
					(editing.key === "new" ||
					editing.key === "resolved")
				}
			/>
		</Col>
		<Col xs={6}>
			<Field 
				name="sla_paused" 
				component={Toggle} 
				label="Pausa el SLA"
				style={{padding: "1rem", width: "80%"}}
				disabled={stage === "END"}
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
				disabled={
					editing && 
					(editing.key === "new" ||
					editing.key === "resolved")
				}
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
				// comentada la validacion de abajo, ya que cualquier estado, SI puede ir a nuevo
				//disabled={ editing &&  editing.key === "new" }
			>
				{do {
					if(!editing) renderOptions(states);
					else
						renderOptions(states.filter(({key}) => key !== editing.key))
				}}
			</Field>
		</Col>
		<FormButtonGroup
			cancel={closeModal}
			send={e => {
				handleSubmit();
				reset();
				closeModal();
			}}
			//style={{marginTop: "-1rem"}}
		/>
		{/*<RaisedButton 
			disabled={!dirty}
			label="Guardar" 
			primary
			fullWidth
			onClick={e => {
				handleSubmit();
				reset();
				closeModal();
			}} 
		/>*/}
	</Row>
)