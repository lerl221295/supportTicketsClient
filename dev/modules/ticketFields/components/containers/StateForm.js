import React from 'react'
import { connect }  from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { updateState, addState, closeModal } from '../../actions/states'

import Form from '../presentationals/states/Form'

const CustomContainer = Component => ({updateState, addState, editing, ...rest}) => {
	return <Component {...rest} onSubmit={ do {
		if(editing) updateState;
		else addState;
	}}/>
}

export default compose(
	connect(({ticketFields: {states}}) => ({
		states: states.nodes,
		editing: states.modal.editing
	}), {updateState, addState, closeModal}),
	CustomContainer,
	reduxForm({form: 'stateForm', enableReinitialize: true})
)(Form)