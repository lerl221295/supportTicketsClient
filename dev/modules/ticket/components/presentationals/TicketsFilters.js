import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { Paper, Divider} from 'material-ui'
import ReactSelectWithIcon from '../../../../common/components/ReactSelectWithIcon'
import InputWithIcon from '../../../../common/components/InputWithIcon'
import {
	TextField,
	SelectField,
	MenuItem,
	Checkbox,
	RadioButtonGroup,
	RadioButton
} from 'material-ui'
import Person from 'material-ui/svg-icons/action/account-circle'
import Organization from 'material-ui/svg-icons/communication/business'

import GetOrganizationsNames from '../../graphql/querys/organizationsNames.graphql'
import GetGroupsNames from '../../graphql/querys/groupsNames.graphql'
import GetSuppliersNames from '../../graphql/querys/suppliersNames.graphql'
import GetAgentsNames from '../../graphql/querys/agentsNames.graphql'
import GetClientsNames from '../../graphql/querys/clientsNames.graphql'

const renderTextField = (
	{
		input,
		label,
		meta: { touched, error },
		...custom
	}) => (
		<InputWithIcon
			Icon={Person}
			Input={TextField}
			hintText="Escriba el nombre"
			floatingLabelText="Nombre"
			name="name"
			{...input}
			{...custom}
		/>
)

const renderCheckbox = ({ input, label }) => (
	<Checkbox
		label={label}
		checked={input.value ? true : false}
		onCheck={input.onChange}
	/>
)

const renderRadioGroup = ({ input, ...rest }) => (
	<RadioButtonGroup
		{...input}
		{...rest}
		valueSelected={input.value}
		onChange={(event, value) => input.onChange(value)}
	/>
)

const renderSelectField = (
	{
		input,
		label,
		children,
		meta,
		options,
		...custom
	}) => (
		<InputWithIcon
			Input={SelectField}
			{...input}
			onChange={(event, index, value) => input.onChange(value)}
			floatingLabelText={label}
			{...custom}
		>
			{
				options.map(({value, text}, i) => (
					<MenuItem 
						key={i} 
						primaryText={text} 
						value={value}
						checked={input.value.includes(value)}
					/>
				))
			}
		</InputWithIcon>
	)

	//sin icon:
	/*<SelectField
			floatingLabelText={label}
			{...input}
			onChange={(event, index, value) => input.onChange(value)}
			{...custom}
		>
			{
				options.map(({value, text}, i) => (
					<MenuItem 
						key={i} 
						primaryText={text} 
						value={value}
						checked={input.value.includes(value)}
					/>
				))
			}
		</SelectField>*/

const renderSelectReactField = (
	{
		input,
		label,
		...custom
	}) => (
		<ReactSelectWithIcon
			label={label}
			{...input}
			onChange={(value) => input.onChange(value)}
			onBlur={(e) => {
				e.preventDefault();
				//input.onBlur(input.value);
			}}
			valueKey="id" labelKey="name"
			backspaceRemoves={true}
			autoload={false}
			filterOption={() => (true)}
			//value={input.value}
			{...custom}
		/>
	)

@withApollo
@reduxForm({
	form: 'FilterForm'
})
class FilterForm extends Component {
	searchData = (key, GraphqlQuery) => (search_text) => (
		this.props.client.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
		.then( ({data} ) => ( data[key].nodes ))
		.then(options =>  ({options}) )
	);

	render = () => {
		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<Paper style={{padding: "1rem"}}>
				<h2 style={{textAlign: "center"}}>Filtrar Propiedades</h2>
				<Divider />
				<form onSubmit={handleSubmit}>
					<Field
						Icon={Person}
						name="clients"
						component={renderSelectReactField}
						label="Clientes"
						placeholder="Seleccione los clientes"
						loadOptions={this.searchData("clients", GetClientsNames)}
						multi
					/>
					<Field
						Icon={Person}
						name="agents"
						component={renderSelectReactField}
						label="Agentes"
						placeholder="Seleccione los agentes"
						loadOptions={this.searchData("agents", GetAgentsNames)}
						multi
					/>
					<Field
						Icon={Organization}
						name="organizations"
						component={renderSelectReactField}
						label="Organizaciones"
						placeholder="Seleccione las organizaciones"
						loadOptions={this.searchData("organizations", GetOrganizationsNames)}
						multi
					/>
					<Field
						Icon={Organization}
						name="suppliers"
						component={renderSelectReactField}
						label="Proveedores"
						placeholder="Seleccione los proveedores"
						loadOptions={this.searchData("suppliers", GetSuppliersNames)}
						multi
					/>
					<Field
						Icon={Organization}
						name="groups"
						component={renderSelectReactField}
						label="Grupos"
						placeholder="Seleccione los grupos"
						loadOptions={this.searchData("groups", GetGroupsNames)}
						multi
					/>
					<Field
						Icon={Person}
						name="priorities"
						component={renderSelectField}
						label="Prioridades"
						multiple
						options={[
							{value: "LOW", text: "Baja"},
							{value: "MEDIUM", text: "Media"},
							{value: "HIGH", text: "Alta"},
							{value: "URGENT", text: "Urgente"}
						]}
					/>
					{
						do {
							if(!this.props.data.loading && !this.props.data.error)
									<Field
										Icon={Person}
										name="types_keys"
										component={renderSelectField}
										label="Tipos"
										multiple
										options={this.props.data.ticketTypes.map(({key, label}) => ({value: key, text: label}))}
									/>
						}
					}
					{
						do {
							if(!this.props.data.loading && !this.props.data.error)
								<Field
									Icon={Person}
									name="states_keys"
									component={renderSelectField}
									label="Estatus"
									multiple
									options={this.props.data.ticketStatus.map(({key, label}) => ({value: key, text: label}))}
								/>
						}
					}
					<Field
						Icon={Person}
						name="due_by"
						component={renderSelectField}
						label="Hecho en"
						multiple
						options={[
							{value: "OVERDUE", text: "Atrasado"},
							{value: "TODAY", text: "Hoy"},
							{value: "TOMORROW", text: "Mañana"}
						]}
					/>
					{/*<div>
						<button type="submit" disabled={pristine || submitting}>
							Submit
						</button>
						<button type="button" disabled={pristine || submitting} onClick={reset}>
							Clear Values
						</button>
					</div>*/}
				</form>
			</Paper>
		)

	}
}

export default FilterForm