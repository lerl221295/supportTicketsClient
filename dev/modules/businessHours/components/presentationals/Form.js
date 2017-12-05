import React from 'react'
import { Paper, List, ListItem, Divider, RaisedButton, Subheader } from 'material-ui'
import { grey600, blueGrey800 } from 'material-ui/styles/colors'
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
import { InputWithIcon, WrappedSubheader, FormButtonGroup } from '../../../../common/components'

const renderWorkingDays = (props) => {
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

const renderHolidays = (holidays) => {
	return(
		<List>
			<Subheader>Dias Festivos</Subheader>
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

const NewHoliday = () => (
	<Row bottom="xs">
		<Col xs={6}>
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
		<Col xs={4}>
			<RaisedButton label="Agregar Festivo" primary={true} />
		</Col>
	</Row>
)

const NewHolidayWithReduxForm = reduxForm({form: 'newHoliday'})(NewHoliday);

export default ({data, ...props}) => {
	//console.log(data);
	if(data.loading) return <h1> Cargando </h1>
	//console.log(twentyfour_seven);
	return(
		<Row center="xs" style={{marginTop: '3rem'}}>
			<Col xs={8}>
				<WrappedSubheader>
					Horario Habil
				</WrappedSubheader>
				<Paper style={{padding: "2rem"}}>
					<Col xs={8}>
						<Field 
							name="twentyfour_seven" 
							component={Toggle} 
							label="Laborar 24 horas, los 7 dias de la semana"
							labelStyle={{color: grey600, 'fontWeight': 'bold'}}
						/>
					</Col>
					<Row middle="xs" start="xs">
						<Col xs={12}>
							{ renderWorkingDays(props) }
						</Col>
					</Row>
					<Row start="xs">
						<Col xs={12}>
							{ renderHolidays(data.businessHours.holidays) }		
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<NewHolidayWithReduxForm />
						</Col>
					</Row>	
					<Row>
						<FormButtonGroup cancel={() => alert("cancelar")} send={() => alert("send")}/>
					</Row>
				</Paper>
			</Col>
		</Row>
	)
}