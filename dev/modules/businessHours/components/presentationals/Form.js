import React from 'react'
import { Paper, List, ListItem, Divider, RaisedButton } from 'material-ui'
import { Field, reduxForm } from 'redux-form'
import {
  Toggle,
  DatePicker,
  TimePicker,
  TextField,
  Checkbox
} from 'redux-form-material-ui'
import moment from 'moment'
import { Row, Col } from 'react-flexbox-grid'
import { InputWithIcon } from '../../../../common/components'

const renderWorkingDays = (props) => {
	const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
	const hide = do {
		if(props.twentyfour_seven) ({display: "none"});
		else ({});
	}
	return(
		<List style={{padding: "1rem", ...hide}}>
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

const renderHolidays = (holidays) => {
	return(
		<List>
			{
				holidays.map(({name, day, month}, i) => (
					<div key={i}>
						<ListItem>
							{`${name} ${day}/${month}`}
						</ListItem>
						<Divider/>
					</div>
				))
			}
		</List>
	)
}

export default ({data, ...props}) => {
	//console.log(data);
	if(data.loading) return <h1> Cargando </h1>
	//console.log(twentyfour_seven);
	return(
		<Row center="xs" middle="xs" style={{marginTop: '3rem'}}>
			<Col xs={8}>
				<Paper style={{padding: "2rem"}}>
					<Col xs={3}>
						<Field 
							name="twentyfour_seven" 
							component={Toggle} 
							label="24 x 7"
						/>
					</Col>
					<Row start="xs">
						<Col xs={12}>
							{ renderWorkingDays(props) }
						</Col>
						<Col xs={12}>
							{ renderHolidays(data.businessHours.holidays) }
							<NewHolidayWithReduxForm />
						</Col>
					</Row>
				</Paper>
			</Col>
		</Row>
	)
}

const NewHoliday = () => (
	<Row bottom="xs">
		<Col xs={7}>
			<Field 
				name="newHolidayName" 
				component={TextField} 
				label="Fecha Festiva"
				floatingLabelText="Nueva fecha festiva"
				style={{width: "100%"}}
			/>
		</Col>
		<Col xs={2}>
			<Field 
				name="newHolidayDate"
				mode="landscape"
				component={DatePicker}
				format={null}
				disableYearSelection
				minDate={new Date(new Date().getFullYear(), 0, 1)}
				maxDate={new Date(new Date().getFullYear(), 11, 31)}
				textFieldStyle={{width: "100%"}}
				formatDate={date => `${date.getDate()}/${date.getMonth()+1}`}
			/>
		</Col>
		<Col xs={3}>
			<RaisedButton label="Agregar Holiday" primary={true} />
		</Col>
	</Row>
)

const NewHolidayWithReduxForm = reduxForm({form: 'newHoliday'})(NewHoliday);