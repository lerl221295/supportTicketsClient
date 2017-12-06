import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import WorkingDays from '../presentationals/WorkingDaysForm'

export default compose(
	reduxForm({form: 'workingDays'}),
	connect( ({ form }) => ({
		twentyfour_seven: form.businessHours.values.twentyfour_seven,
		...form.workingDays.values
	}))
)(WorkingDays)