import React from 'react'
// React Flexbox Grid
import { Row, Col } from 'react-flexbox-grid'
// Redux Form
import { Field } from 'redux-form'
import { renderSelectReactField } from '../../../../../common/components/ReduxFormComponents'
import { SelectField } from 'redux-form-material-ui'
// Commons
import { menuItemOptions } from '../../../../../common/utils/generators'
import { TIMES_BEFORE, TIMES_AFTER } from '../../../../../common/utils/consts'
// Graphql Querys
import { GetAgentsNames } from '../../../graphql/querys'

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