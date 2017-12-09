import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RaisedButton} from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import {
  DatePicker,
  TextField
} from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'

import { addHoliday } from '../../actions/holidays'

const NewHoliday = ({handleSubmit, reset}) => (
	<Row bottom="xs">
		<Col xs={6}>
			<Field 
				name="newHolidayName" 
				component={TextField} 
				//placeholder="Nombre de la Fecha Festiva"
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
				floatingLabelText="Fecha"
				disableYearSelection
				minDate={new Date(new Date().getFullYear(), 0, 1)}
				maxDate={new Date(new Date().getFullYear(), 11, 31)}
				textFieldStyle={{width: "100%"}}
				formatDate={date => `${date.getDate()}/${date.getMonth()+1}`}
			/>
		</Col>
		<Col xs={4}>
			<RaisedButton 
				label="Agregar Festivo" 
				primary={true} 
				onClick={e => {
					handleSubmit();
					reset();
				}} 
			/>
		</Col>
	</Row>
);

/*mude este mapeo para el actioncreator, no estoy seguro de donde debe ir, pero asi evito el dispatch*/
/*const mapDispatch = dispatch => ({
	onSubmit: holiday => {
		dispatch(
			addHoliday({
				name: holiday.newHolidayName,
				day: holiday.newHolidayDate.getDate(),
				month: holiday.newHolidayDate.getMonth()
			})
		)
	}
})
*/
export default compose(
	connect(null, {onSubmit: addHoliday}),//en este orden para reduxForm reciba el prop onSubmit
	reduxForm({form: 'newHoliday'})
)(NewHoliday)
