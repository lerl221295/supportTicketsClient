import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { push } from 'react-router-redux'
import Form from '../presentationals/Form'
import BusinessHours from '../../graphql/querys/businessHours.graphql'

const generateHour = ({hour, minutes}) => {
	const date = new Date();
	date.setHours(hour);
	date.setMinutes(minutes);
	return date;
}

class BusinessHoursContainer extends Component {
	render = () => {
		const { data } = this.props
		let initialValues = {};
		if(data.businessHours){
			const { businessHours } = data;
			initialValues.twentyfour_seven = businessHours.twentyfour_seven
			for(let working_day of businessHours.working_days){
				initialValues[working_day.day] = working_day.workeable;
				initialValues[`${working_day.day}_start`] = generateHour(working_day.horary.start);
				initialValues[`${working_day.day}_end`] = generateHour(working_day.horary.end);
			}
		}


		const BusinessHoursWithReduxForm = reduxForm({ form: 'businessHours' })(Form);

		const FormWithRedux = connect(({form}) => {
			if(!form.businessHours) return {};
			else return({
				...form.businessHours.values
			})
		})
		((props) => 
			<BusinessHoursWithReduxForm 
				{...props}
				initialValues={initialValues}
			/>
		)

		return( <FormWithRedux {...this.props} /> );
		
	}
}

export default graphql(BusinessHours)(BusinessHoursContainer);

