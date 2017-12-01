import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'react-flexbox-grid'
import { 
	Paper, 
	Divider, 
	FlatButton, 
	Subheader,
	RadioButton,
	MenuItem
} from 'material-ui'
import {
  Checkbox,
  DatePicker,
  RadioButtonGroup,
  SelectField,
  TextField
} from 'redux-form-material-ui'
import {typography} from 'material-ui/styles';
import {grey400, cyan600, white} from 'material-ui/styles/colors';

import { renderSelectReactField } from '../../../../../common/components/ReduxFormComponents'
import { PRIORITIES, CHANELS } from '../../../../../common/utils/consts'

import GetGroupsNames from '../../../graphql/querys/groupsNames.graphql'
import GetSuppliersNames from '../../../graphql/querys/suppliersNames.graphql'
import GetAgentsNames from '../../../graphql/querys/agentsNames.graphql'

const renderMenuItems = options => (
	options.map(({value, text}, i) => (
		<MenuItem 
			key={i} 
			primaryText={text} 
			value={value}
			//checked={input.value.includes(value)}
		/>
	))
)

const renderCustomField = custom_field => {
	const { type, key, label, options } = custom_field
	if(type === "SELECT") {
		let orderly = Array.from(options)
			.sort((a, b) => a.position - b.position)
		return(
			<Field
				key={key}
				name={key}
				component={SelectField}
				label={label}
				style={{width: "100%"}}
			>
			{
				renderMenuItems(orderly.map(({key, label}) => ({value: key, text: label})))
			}
			</Field>
		);
	}

	let { Component, custom } = do {
		if(type === "TEXT" || type === "TEXTAREA" || type === "NUMBER") 
			({Component: TextField, custom: {style: {width: "100%"} } });
		else if(type === "DATE") 
			({
				Component: DatePicker, 
				custom: {
					textFieldStyle: {width: "100%"},
					mode: "landscape",
					container: "inline"
				}
			});
		else if(type === "CHECKBOX") 
			({Component: Checkbox, custom: {style: {width: "100%"} } });
	};

	return(
		<Field
			key={key}
			name={key}
			component={Component}
			label={label}
			{...custom}
		/>
	)
}

class PropsForm extends Component {
	render = () => {
		const { 
			ticket, 
			dirty, 
			ticketTypes, 
			custom_fields,
			searchData
		} = this.props;
		
		const STATUS = [
			{ value: ticket.state.key, text: ticket.state.label },
			...ticket.next_states.map(({key, label}) => ({value: key, text: label}))
		];

		const TYPES = ticketTypes.map(({key, label}) => ({value: key, text: label}));
		
		return (
			<div>
				<Subheader style={{
					fontSize: 24,
					fontWeight: typography.fontWeightLight,
					backgroundColor: grey400,
					color: white
				}}>
					Propiedades del Ticket
				</Subheader>
				<Paper style={{padding: "1rem"}}>
					<form>
						<Field
							name="priority"
							component={SelectField}
							label="Prioridad"
							style={{width: "100%"}}
						>
						{
							renderMenuItems(PRIORITIES)
						}
						</Field>
						<Field
							name="state"
							component={SelectField}
							label="Status"
							style={{width: "100%"}}
						>
						{
							renderMenuItems(STATUS)
						}
						</Field>
						<Field
							name="type"
							component={SelectField}
							label="Tipo"
							style={{width: "100%"}}
						>
						{
							renderMenuItems(TYPES)
						}
						</Field>
						<Field
							name="source"
							component={SelectField}
							label="Canal"
							style={{width: "100%"}}
						>
						{
							renderMenuItems(CHANELS)
						}
						</Field>
						<Field
							name="agent"
							component={renderSelectReactField}
							label="Agente"
							loadOptions={searchData("agents", GetAgentsNames)}
						/>
						<Field
							name="supplier"
							component={renderSelectReactField}
							label="Proveedor"
							loadOptions={searchData("suppliers", GetSuppliersNames)}
						/>
						<Field
							name="group"
							component={renderSelectReactField}
							label="Grupo"
							loadOptions={searchData("groups", GetGroupsNames)}
						/>
						{
							custom_fields.map(custom_field => renderCustomField(custom_field))
						}
					</form>
				
					<Row center="xs">
						<Col xs={6} md={6} sm={6}>
							<FlatButton
								label="Actualizar"
								primary={true}
								onClick={this.props.handleSubmit}
								disabled={!dirty}
							/>
						</Col>
					</Row>
				</Paper>
			</div>
		)
	}
}

export default PropsForm