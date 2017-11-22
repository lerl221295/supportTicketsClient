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
import GetOrganizationsNames from '../../graphql/querys/organizationsNames.graphql'
import Person from 'material-ui/svg-icons/action/account-circle'
import Organization from 'material-ui/svg-icons/communication/business'

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
		meta: { touched, error },
		children,
		...custom
	}) => (
	<SelectField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		onChange={(event, index, value) => input.onChange(value)}
		children={children}
		{...custom}
	/>
)

const renderSelectReactField = (
	{
		input,
		label,
		meta: { touched, error },
		children,
		...custom
	}) => (
	<ReactSelectWithIcon
		Icon={Organization}
		label={"Organizacion"}
		onChange={(value) => input.onChange(value)}
		valueKey="id" labelKey="name"
		backspaceRemoves={true}
		placeholder="Seleccione la organizacion"
		autoload={false}
		filterOption={() => (true)}
		{...input}
		{...custom}
	/>
)

@withApollo
@reduxForm({
	form: 'FilterForm'
})
class FilterForm extends Component {
	searchOrganizations = (search_text) => (
		this.props.client.query({
			query: GetOrganizationsNames,
			variables: {search_text}
		}).then( ({data: {organizations}} ) => (
			organizations.nodes.map(organization => ({
				id: organization.id,
				name: organization.name
			}))
		)).then(options =>  ({options}) )
	);

	render = () => {
		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<Paper>
				<h2>Filtrar Propiedades</h2>
				<Divider />
				<form onSubmit={handleSubmit}>
					<div>
						<Field
							name="firstName"
							component={renderTextField}
							label="First Name"
						/>
					</div>
					<div>
						<Field name="lastName" component={renderTextField} label="Last Name" />
					</div>
					<div>
						<Field name="email" component={renderTextField} label="Email" />
					</div>
					<div>
						<Field name="sex" component={renderRadioGroup}>
							<RadioButton value="male" label="male" />
							<RadioButton value="female" label="female" />
						</Field>
					</div>
					<div>
						<Field
							name="favoriteColor"
							component={renderSelectField}
							label="Favorite Color"
						>
							<MenuItem value="ff0000" primaryText="Red" />
							<MenuItem value="00ff00" primaryText="Green" />
							<MenuItem value="0000ff" primaryText="Blue" />
						</Field>
					</div>
					<div>
						<Field name="employed" component={renderCheckbox} label="Employed" />
					</div>
					<div>
						<Field
							name="notes"
							component={renderTextField}
							label="Notes"
							multiLine={true}
							rows={2}
						/>
					</div>
					<div>
						<Field
							name="organization"
							component={renderSelectReactField}
							label="Notes"
							loadOptions={this.searchOrganizations}
						/>
					</div>
					<div>
						<button type="submit" disabled={pristine || submitting}>
							Submit
						</button>
						<button type="button" disabled={pristine || submitting} onClick={reset}>
							Clear Values
						</button>
					</div>
				</form>
			</Paper>
		)

	}
}

export default FilterForm