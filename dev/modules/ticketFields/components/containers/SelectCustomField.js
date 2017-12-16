import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getFormValues } from 'redux-form'
import { RaisedButton } from 'material-ui'
import { setOptions, addField, closeModal } from '../../actions/customFields'

const reduxContainer = connect(
	(state) => ({
		field: {
			options: state.ticketFields.customFields.modals.selectField.options,
			...getFormValues('newSelectCustomField')(state)
		}
	}),
	{ setOptions, addField, closeModal }
)

@reduxContainer
class Buttons extends Component {
	
	/*recibe props pero jamas re-renderiza el component por las nuevas props*/
	//shouldComponentUpdate = nextProps => false;

	render = () => (
		<RaisedButton 
			disabled={!this.props.valid || !this.props.field.options.length}
			label="Agregar Campo Personalizado" 
			primary
			onClick={e => {
				this.props.addField({...this.props.field});
				this.props.reset();
				this.props.setOptions([]);
				this.props.closeModal("SELECT");
			}} 
		/>
	)
}

export default Buttons;