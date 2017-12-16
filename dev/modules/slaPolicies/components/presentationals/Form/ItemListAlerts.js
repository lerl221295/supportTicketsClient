import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Field } from 'redux-form'
import { renderSelectReactField } from '../../../../common/components/ReduxFormComponents'
import { menuItemOptions } from '../../../../common/utils/generators'
import { SelectField } from 'redux-form-material-ui'
import { GetAgentsNames } from '../../graphql/querys'

const TIMES_BEFORE = [
	{
		label: '8 horas antes',
		value: 8
	},
	{
		label: '4 horas antes',
		value: 4
	},
	{
		label: '2 horas antes',
		value: 2
	},
	{
		label: '1 horas antes',
		value: 1
	},
	{
		label: '30 horas antes',
		value: 0.5
	},
];

const TIMES_AFTER = [
	{
		label: 'Inmediatamente',
		value: 0
	},
	{
		label: '30 minutos después',
		value: 0.5
	},
	{
		label: '1 hora después',
		value: 1
	},
	{
		label: '2 horas después',
		value: 2
	},
	{
		label: '4 horas después',
		value: 4
	},
	{
		label: '8 horas después',
		value: 8
	},
	{
		label: '12 horas después',
		value: 12
	},
	{
		label: '1 día después',
		value: 24
	},
	{
		label: '2 días después',
		value: 48
	},
	{
		label: '3 días después',
		value: 72
	},
	{
		label: '1 semana después',
		value: 168
	},
];

export default ({ type, motive, time, message, searchData, index }) => (
	<Row bottom={'xs'}>
		<Col xs={4}>
			<Field
				name={`alerts[${index}].time`}
				component={SelectField}
				hintText={"Horario de atención"}
				style={{width: "100%"}}
			>
				{ menuItemOptions(
						do {
							if (type === 'REMINDER') TIMES_BEFORE
							else TIMES_AFTER
						}
					)
				}
			</Field>
		</Col>
		<Col xs={8}>
			<Field
				name={`alerts[${index}].to`}
				component={renderSelectReactField}
				label="Agentes"
				placeholder="Seleccione los agentes"
				loadOptions={searchData("agents", GetAgentsNames)}
				multi
			/>
		</Col>
	</Row>
);