import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'react-flexbox-grid'
import { 
	Paper, 
	Divider, 
	FlatButton, 
	Subheader,
	RadioButton,
	MenuItem,
	Card,
	CardHeader,
	CardText,
	FloatingActionButton
} from 'material-ui'
import {
	ContentSave as Save
} from 'material-ui/svg-icons'
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
				name={`custom.${key}`}
				component={SelectField}
				label={label}
				style={{width: "100%"}}
				floatingLabelText={label}
			>
			{
				renderMenuItems(orderly.map(({key, label}) => ({value: key, text: label})))
			}
			</Field>
		);
	}

	let { Component, custom } = do {
		if(type === "TEXT") 
			({Component: TextField, custom: {style: {width: "100%"} } });
		else if(type === "NUMBER") 
			({
				Component: TextField, 
				custom: {
					style: {width: "100%"},
					type: 'number',
					floatingLabelText: label
				}
			});
		else if(type === "TEXTAREA")
			({
				Component: TextField, 
				custom: {
					style: {width: "100%"},
					multiLine: true,
					rowsMax: 6,
					floatingLabelText: label
				} 
			});
		else if(type === "DATE") 
			({
				Component: DatePicker, 
				custom: {
					textFieldStyle: {width: "100%"},
					mode: "landscape",
					container: "inline",
					floatingLabelText: label/*,
					format: null*/
				}
			});
		else if(type === "CHECKBOX") 
			({
				Component: Checkbox, 
				custom: {
					style: {width: "100%", marginTop: "0.6rem"} 
				} 
			});
	};

	return(
		<Field
			key={key}
			name={`custom.${key}`}
			component={Component}
			label={label}
			{...custom}
		/>
	)
}

class PropsForm extends Component {
	state = { expanded: true } //para poder tenerlo expandido por defecto!

	handleExpandChange = (expanded) => this.setState({expanded: expanded});

	render = () => {
		const { 
			ticket, 
			dirty, 
			ticketTypes, 
			custom_fields,
			searchData,
			searchAgents
		} = this.props;
		
		const STATUS = [
			{ value: ticket.state.key, text: ticket.state.label },
			...ticket.next_states.map(({key: value, label: text}) => ({value, text}))
		];

		const TYPES = ticketTypes.map(({key: value, label: text}) => ({value, text}));
		
		let DEVICES = ticket.client.devices.map(({id: value, code, name}) => ({
			value,
			text: `${name} - ${code}`
		}))

		/*solo por la data mock*/
		DEVICES = [
			{value: ticket.device.id, text: ticket.device.name},
			...DEVICES
		]

		return (
			<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
				<CardHeader
			      	title="Propiedades del Ticket"
			      	avatar={
			      		<FloatingActionButton 
	      					mini
	      					zDepth={0}
	      					onClick={e => {
	      						e.stopPropagation();
	      						this.props.handleSubmit();
	      					}}
							disabled={!dirty}
	      				>
		      				<Save/>
		      			</FloatingActionButton>
			      	}
			      	actAsExpander={true}
			      	showExpandableButton={true}
			    />
				<CardText expandable style={{padding: "0 1rem 0 1rem"}}>
					<form>
						<Row>
							<Col xs={12} md={6} sm={6}>
								<Field
									name="priority"
									component={SelectField}
									floatingLabelText="Prioridad"
									label="Prioridad"
									style={{width: "100%"}}
								>
								{
									renderMenuItems(PRIORITIES)
								}
								</Field>
							</Col>
							<Col xs={12} md={6} sm={6}>
								<Field
									name="state_key"
									component={SelectField}
									floatingLabelText="Estado"
									label="Status"
									style={{width: "100%"}}
								>
								{
									renderMenuItems(STATUS)
								}
								</Field>
							</Col>
						</Row>
						
						
						<Field
							name="type_key"
							component={SelectField}
							floatingLabelText="Tipo"
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
							floatingLabelText="Canal"
							label="Canal"
							style={{width: "100%"}}
						>
						{
							renderMenuItems(CHANELS)
						}
						</Field>
						<Field
							name="device_id"
							component={SelectField}
							floatingLabelText="Dispositivo"
							label="Dispositivo"
							style={{width: "100%"}}
						>
						{
							renderMenuItems(DEVICES)
						}
						</Field>
						<Field
							name="agent"
							component={renderSelectReactField}
							label="Agente"
							loadOptions={searchAgents}
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
				</CardText>
			</Card>
		)
	}
}

export default PropsForm