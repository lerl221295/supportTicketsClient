import React from 'react'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import { grey600, blueGrey800 } from 'material-ui/styles/colors'
import { Field } from 'redux-form'
import {
  TimePicker,
  Checkbox
} from 'redux-form-material-ui'
import moment from 'moment'
import { Row, Col } from 'react-flexbox-grid'

const WorkingDays = (props) => {
	const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
	return(
		<List style={{padding: "1rem", display: do {
			if(props.twentyfour_seven) "none";
			else null;
		}}}>
			<Subheader>Dias Laborables</Subheader>
			{
				days.map(day => {
					let diffHours = moment(props[`${day}_end`]).diff(moment(props[`${day}_start`]), 'hours');
					let diffMinutes = moment(props[`${day}_end`]).diff(moment(props[`${day}_start`]).add(diffHours, 'hours'), 'minutes');
					if(diffHours && props[day]) diffHours = `${diffHours} hrs`;
					else diffHours = "";
					if(diffMinutes && props[day]) diffMinutes = `${diffMinutes} mns`;
					else diffMinutes = "";
					return(
						<div key={day}>
							<ListItem>
								<Row middle="xs">
									<Col xs={3}>
										<Field name={day} 
											component={Checkbox} 
											label={day}
										/>
									</Col>
									<Col xs={2}>
										<Field
											textFieldStyle={{width: "100%"}}
											component={TimePicker}
											format={null}
											name={`${day}_start`}
								          	hintText="Comienza"
								          	disabled={!props[day]}
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
											name={`${day}_end`}
								          	hintText="Termina"
								          	disabled={!props[day]}
								        />
									</Col>
									<Col xs={3}>
										{diffHours} {diffMinutes}
									</Col>
								</Row>
							</ListItem>
							<Divider />
						</div>
					)
				})
			}
		</List>
	)
}

export default WorkingDays