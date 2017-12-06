import React from 'react'
import { MenuItem } from 'material-ui'
import { Field } from 'redux-form'
import {
  TimePicker,
  SelectField
} from 'redux-form-material-ui'
import moment from 'moment'
import { Row, Col } from 'react-flexbox-grid'

import { renderSelectField } from '../../../../common/components/ReduxFormComponents'
import { WEEK_DAYS } from '../../../../common/utils/consts'

export default (props) => {
	let diffHours = '';
	let diffMinutes = '';
	if(props[`horary_start`] && props[`horary_end`]){
		diffHours = moment(props[`horary_end`]).diff(moment(props[`horary_start`]), 'hours');
		diffMinutes = moment(props[`horary_end`]).diff(moment(props[`horary_start`]).add(diffHours, 'hours'), 'minutes');
		if(diffHours) diffHours = `${diffHours} hrs`;
		else diffHours = "";
		if(diffMinutes) diffMinutes = `${diffMinutes} mns`;
		else diffMinutes = "";
	}

	return(
		<Row middle="xs">
			<Col xs={4}>
				{/*<Field 
					name="week_days"
					component={SelectField} 
					hintText="Dias de la Semana"
					floatingLabelText="Dias laborables"
					style={{width: "100%"}}
					multiple
				>
					<MenuItem value="MONDAY" primaryText="Lunes"/>
					<MenuItem value="TUESDAY" primaryText="Martes"/>
					<MenuItem value="WEDNESDAY" primaryText="Miercoles"/>
					<MenuItem value="THURSDAY" primaryText="Jueves"/>
					<MenuItem value="FRIDAY" primaryText="Viernes"/>
					<MenuItem value="SATURDAY" primaryText="Sabado"/>
					<MenuItem value="SUNDAY" primaryText="Domingo"/>
				</Field>*/}
				<Field //con renderSelectField para el check en las opciones :D
					name="week_days"
					component={renderSelectField}
					label="Dias de la Semana"
					options={WEEK_DAYS}
					multiple
				/>

			</Col>
			<Col xs={2}>
				<Field
					textFieldStyle={{width: "100%"}}
					component={TimePicker}
					format={null}
					name={`horary_start`}
		          	hintText="Comienza"
		        />
			</Col>
			<Col xs={2}>
				Hasta
			</Col>
			<Col xs={2}>
				<Field
					textFieldStyle={{width: "100%"}}
					component={TimePicker}
					format={null}
					name={`horary_end`}
		          	hintText="Termina"
		        />
			</Col>
			<Col xs={2}>
				{diffHours} {diffMinutes}
			</Col>
		</Row>
	)
}