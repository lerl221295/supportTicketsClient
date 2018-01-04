import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton, MenuItem } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField, SelectField, Toggle } from 'redux-form-material-ui'
import { Field } from 'redux-form'
import { FormButtonGroup } from '../../../../common/components'
import { renderSelectField, renderSelectReactField } from '../../../../common/components/ReduxFormComponents'
import { PRIORITIES, TYPES } from '../../../../common/utils/consts'
import GetAgentsNames from '../../graphql/querys/agentsNames.graphql'
import GetClientsNames from '../../graphql/querys/clientsNames.graphql'

export default ({handleSubmit, dirty, reset, closeModal, searchData, types}) => (
	<Row >
		<Col xs={6}>
			<Field
				name="client"
				component={renderSelectReactField}
				label="Cliente"
				placeholder="Seleccione el cliente"
				loadOptions={searchData('clients', GetClientsNames)}
			/>
		</Col>
		<Col xs={6}>
			<Field 
				name="title" 
				component={TextField} 
				hintText="Titulo"
				floatingLabelText="Titulo"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={12}>
			<Field 
				name="description" 
				component={TextField} 
				hintText="Descripcion"
				floatingLabelText="Descripcion"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={6}>
			<Field
				name="agent"
				component={renderSelectReactField}
				label="Agente"
				loadOptions={searchData('agents', GetAgentsNames)}
			/>
		</Col>
		<Col xs={3}>
			<Field
				name="priority"
				component={renderSelectField}
				label="Prioridad"
				floatingLabelText="Prioridad"
				options={PRIORITIES}
			/>
		</Col>
		<Col xs={3}>
			<Field
				name="type_key"
				component={renderSelectField}
				label="Tipo"
				floatingLabelText="Tipo"
				options={types || []}
			/>
		</Col>
		<FormButtonGroup
			cancel={e => {
				reset();
				closeModal();
			}}
			send={e => {
				handleSubmit();
				reset();
				closeModal();
			}}
		/>
	</Row>
)