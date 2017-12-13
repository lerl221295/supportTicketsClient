import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { push } from 'react-router-redux'
import BusinessHoursForm from '../presentationals/BusinessHours'
import BusinessHours from '../../graphql/querys/businessHours.graphql'
import { setHolidays } from '../../actions/holidays'

const generateHour = ({hour, minutes}) => {
	const date = new Date();
	date.setHours(hour);
	date.setMinutes(minutes);
	return date;
}

@compose(
	graphql(BusinessHours),
	connect(null, { setHolidays })
)
class BusinessHoursContainer extends Component {

	componentWillReceiveProps = ({data, ...rest}) => {
		if(data.businessHours){
			/*mapeo para luego poder enviar esa misma data*/
			this.props.setHolidays(
				data.businessHours.holidays.map(({name, day, month}) => ({
					name,
					day,
					month
				}))
			);
		}
	}

	render = () => {
		const { data } = this.props
		let initialValues = {};
		let workingDays = {};
		if(data.businessHours){
			const { businessHours } = data;
			initialValues.mode = businessHours.mode;
			
			if(businessHours.mode === "CUSTOMIZED"){
				for(let working_day of businessHours.working_days){
					workingDays[working_day.day] = working_day.workeable;
					if(working_day.workeable){
						workingDays[`${working_day.day}_start`] = generateHour(working_day.horary.start);
						workingDays[`${working_day.day}_end`] = generateHour(working_day.horary.end);
					}
				}
			}
			else if(businessHours.mode === "SAME_FOR_DAYS") {
				workingDays.week_days = businessHours.week_days;
				workingDays.horary_start = generateHour(businessHours.horary.start);
				workingDays.horary_end = generateHour(businessHours.horary.end);
			}
		}

		const BusinessHoursWithReduxForm = reduxForm({ form: 'businessHours' })(BusinessHoursForm);
		/*no le paso data.businessHours porque los working_days los envio mapeados,
		los holidays los seteo en el store de redux y el mode es un initialValue*/

		return( 
			<BusinessHoursWithReduxForm 
				loading={this.props.data.loading}
				error={this.props.data.error}
				workingDays={workingDays}
				initialValues={initialValues}
			/> 
		);
		
	}
}

export default BusinessHoursContainer
