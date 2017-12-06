import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { graphql, compose, withApollo } from 'react-apollo'

import { FormButtonGroup} from '../../../../common/components'

@connect( (state) => ({
	twentyfour_seven: getFormValues('businessHours')(state).twentyfour_seven,
	working_days: getFormValues('workingDays')(state),
	holidays: state.businessHours.holidays
}))
class Buttons extends Component {
	
	/*recibe props pero jamas re-renderiza el component por las nuevas props*/
	shouldComponentUpdate = nextProps => false ;

	render = () => (
		<FormButtonGroup 
			cancel={() => alert("cancelar")} 
			send={() => console.log("send: ", this.props)}
		/>
	)
}

export default Buttons;