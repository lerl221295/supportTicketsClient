import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton, MenuItem } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField, SelectField, Toggle } from 'redux-form-material-ui'
import { Field } from 'redux-form'
import { FormButtonGroup } from '../../../../../common/components'
import { renderSelectField } from '../../../../../common/components/ReduxFormComponents'
import { STAGES } from '../../../../../common/utils/consts'

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
				component={renderSelectField} 
				floatingLabelText="Etapa"
				disabled={
					editing && 
					(editing.key === "new" ||
					editing.key === "resolved")
				}
				options={STAGES}
			/>
		</Col>
		<Col xs={12}>
			<Field 
				name="came_from" 
				component={renderSelectField} 
				multiple
				floatingLabelText="Estados de donde viene"
				// comentada la validacion de abajo, ya que cualquier estado, SI puede ir a nuevo
				//disabled={ editing &&  editing.key === "new" }
				options={do {
					if(!editing) Array.from(states).filter(state => state.stage !== "END")
						.map(({key: value, label: text}) => ({value, text}));
					else
						Array.from(states).filter(state => (state.stage !== "END" && state.key !== editing.key))
						.map(({key: value, label: text}) => ({value, text}));
				}}
			/>
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