import React, { Component } from 'react'
// React Flexbox Grid
import {Row, Col} from "react-flexbox-grid"
// Material UI
import {IconButton} from "material-ui";
// Redux Form
import {Field} from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui'
import { renderSelectReactField } from '../../../../../../common/components/ReduxFormComponents'
// Material Icons
import { ActionDelete as Delete } from "material-ui/svg-icons";
// Commons
import { menuItemOptions } from '../../../../../../common/utils/generators'

export default class ItemListConditions extends Component {
	
	render = () => {
		let {searchData, changeField, actionName, remove, ticketsFields, action: {__typename: action_type, ...action}} = this.props;
		
		return (
			<Row start={"xs"} bottom={"xs"}>
				<Col xs={4}>
					<Field
						name={`${actionName}.field.key`}
						component={SelectField}
						hintText={"Campo condicionado"}
						onChange={(e) => {
							delete (e.preventDefault)
							let key = '';
							for (let i in e)
								key += e[i];
							changeField(key);
						}}
						style={{width: "100%"}}
					>
						{menuItemOptions([...ticketsFields, {key: 'send_email', label: 'Enviar correo electrónico'}])}
					</Field>
				</Col>
				{
					// Usar el typename para este caso es un puto peo nojoda, cuando se esté agregando la acción va a explotar
					!_.isUndefined(action) && action_type === 'ActionField' &&
					<Col xs={4}>
						Un select bien helmoso xD
						{/*{
							do {
								if (type === 'SELECT')
									if (!['agent', 'client', 'group', 'supplier'].includes(key))
										<Field
											name={`${actionName}.new_value.key`}
											component={SelectField}
											hintText={"Seleccione uno o varios elementos"}
											style={{width: "100%"}}
										>
											{menuItemOptions(_.find(ticketsFields, {key}).options)}
										</Field>
									else
										<Field
											name={`${actionName}.values`}
											component={renderSelectReactField}
											placeholder="Seleccione uno o varios elementos"
											loadOptions={searchData(key)}
											multi
										/>
								else if (type === 'TEXT')
									<Field
										name={`${actionName}.value.text`}
										component={TextField}
										hintText="Ingrese un valor"
										style={{width: "100%", marginBottom: '1rem'}}
									/>
							}
						}*/}
					</Col>
				}
				<Col xs={1}>
					<IconButton
						tooltip="Eliminar condición"
						onClick={ () => remove() }
					>
						<Delete />
					</IconButton>
				</Col>
			</Row>
		)
	}
};