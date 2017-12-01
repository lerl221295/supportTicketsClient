import React from 'react'
import {
	TextField,
	SelectField,
	MenuItem,
	Checkbox,
	RadioButtonGroup,
	RadioButton,
	DatePicker
} from 'material-ui'
import InputWithIcon from './InputWithIcon'
import ReactSelectWithIcon from './ReactSelectWithIcon'

/*wrapper de los componentes de material ui para que funcionen con redux form*/

export const renderTextField = (
	{
		input,
		label,
		meta: { touched, error },
		...custom
	}) => (
		<InputWithIcon
			Input={TextField}
			hintText={label}
			label={label}
			floatingLabelText={label}
			{...input}
			{...custom}
		/>
)

export const renderCheckbox = ({ input, label }) => (
	<Checkbox
		label={label}
		checked={input.value ? true : false}
		onCheck={input.onChange}
	/>
)

export const renderRadioGroup = ({ input, ...rest }) => (
	<RadioButtonGroup
		{...input}
		{...rest}
		valueSelected={input.value}
		onChange={(event, value) => input.onChange(value)}
	/>
)

export const renderSelectField = (
	{
		input,
		label,
		children,
		meta,
		options,
		value,
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

export const renderSelectReactField = (
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

export const renderDatePicker = ({
		input,
		label,
		meta,
		...custom
	}) => {
	console.log(input.value);
	return(
		<DatePicker 
			mode="landscape"
			hintText={label} 
			container="inline"
			value={new Date(input.value)}
			onChange={(_, date) => input.onChange(new Date(date))}
			{...custom}
		/>
	)
}