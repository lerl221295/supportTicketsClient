import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import Reply from '../presentationals/details/Reply'

export default compose(
	reduxForm({ form: 'reply' }),
	connect((state) => ({
			reply: getFormValues('reply')(state)
		})
	)	
)
(Reply)