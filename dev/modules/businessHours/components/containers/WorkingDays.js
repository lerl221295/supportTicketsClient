import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import WorkingDays from '../presentationals/WorkingDaysForm'

export default compose(
	reduxForm({form: 'workingDays'}),
	connect( (state) => ({
		mode: getFormValues('businessHours')(state).mode,
		...getFormValues('workingDays')(state)
	}))
)(WorkingDays)