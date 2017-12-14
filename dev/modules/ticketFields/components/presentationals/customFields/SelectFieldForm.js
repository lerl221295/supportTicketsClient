import React from 'react'
import { ToolbarSeparator, Subheader } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { TextField, Toggle } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'
import SelectOptionsList from './SelectOptionsList'
import NewSelectOption from './NewSelectOption'
import { addField } from '../../../actions/customFields'
import Sender from '../../containers/SelectCustomField'

const NewType = ({handleSubmit, dirty, reset}) => (
	<div>
		<Row middle="xs">
			<Col xs={7}>
				<Row>
					<Subheader>Datos del Campo</Subheader>
					<Col xs={6}>
						<Field 
							name="key" 
							component={TextField} 
							hintText="Clave del campo"
							floatingLabelText="Key del Campo"
							style={{width: "100%"}}
						/>
					</Col>
					<Col xs={6}>
						<Field 
							name="label" 
							component={TextField} 
							hintText="Label de muestra"
							floatingLabelText="Label del Campo"
							style={{width: "100%"}}
						/>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<Field 
							name="clientVisible" 
							component={Toggle} 
							label="Visible para el Cliente"
							style={{padding: "1rem", width: "80%"}}
						/>
					</Col>
				</Row>
				<Row>
					<NewSelectOption/>
				</Row>
			</Col>
			<Col xs={1}>
				<ToolbarSeparator style={{height: '36vh'}}/>
			</Col>
			<Col xs={4}>
				<SelectOptionsList/>
			</Col>
		</Row>
		<Row center="xs" style={{marginTop: "1rem"}}>
			<Col xs={12}>
				<Sender 
					valid={dirty}
					reset={reset}
				/>
			</Col>
		</Row>
	</div>
)

export default reduxForm({form: 'newSelectCustomField'})(NewType)