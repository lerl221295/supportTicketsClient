import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DatePicker } from 'redux-form-material-ui'
import { Row, Col } from 'react-flexbox-grid'

const Range = props => (
	<Row>
		<Col xs={4}>
			<Field 
				name="from"
				mode="landscape"
				component={DatePicker}
				format={null}
				floatingLabelText="Desde"
				maxDate={new Date()}
				textFieldStyle={{width: "100%"}}
				//formatDate={date => `${date.getDate()}/${date.getMonth()+1}`}
			/>
		</Col>
		<Col xs={4}>
			<Field 
				name="to"
				mode="landscape"
				component={DatePicker}
				format={null}
				floatingLabelText="Hasta"
				maxDate={new Date()}
				textFieldStyle={{width: "100%"}}
				//formatDate={date => `${date.getDate()}/${date.getMonth()+1}`}
			/>
		</Col>
	</Row>
)

export default reduxForm({form: 'reportRange', initialValues: {
	from: new Date(new Date().setDate(new Date().getDate()-7)),
	to: new Date()
}})(Range)