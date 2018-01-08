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
import { CONDITIONS_OPERATORS } from '../../../../../../common/utils/consts'

export default class ItemListConditions extends Component {
	
	/*componentWillReceiveProps = (nextProps) => {
		let {conditionedField: { type }} = nextProps;
		console.log('el tipo de la prop que voy a recibir---', type);
	}*/
	
	render = () => {
		let {searchData, changeField, conditionName, conditionedField: { type, key }, remove, ticketsFields} = this.props;
		return (
			<Row start={"xs"} bottom={"xs"}>
				<Col xs={4}>
					<Field
						name={`${conditionName}.conditioned_field.key`}
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
						{menuItemOptions(ticketsFields)}
					</Field>
				</Col>
				{
					!_.isUndefined(type) &&
					<Col xs={3}>
						<Field
							name={`${conditionName}.condition_operator`}
							component={SelectField}
							hintText={"Comparador lógico"}
							style={{width: "100%"}}
						>
							{menuItemOptions(CONDITIONS_OPERATORS[type])}
						</Field>
					</Col>
				}
				{
					!_.isUndefined(type) &&
					<Col xs={4}>
						{
							do {
								if (type === 'SELECT')
									if (!['agent', 'client', 'group', 'supplier'].includes(key))
										<Field
											name={`${conditionName}.values`}
											component={SelectField}
											hintText={"Seleccione uno o varios elementos"}
											style={{width: "100%"}}
											multiple
										>
											{menuItemOptions(_.find(ticketsFields, {key}).options)}
										</Field>
									else
										<Field
											name={`${conditionName}.values`}
											component={renderSelectReactField}
											placeholder="Seleccione uno o varios elementos"
											loadOptions={searchData(key)}
											multi
										/>
								else if (type === 'TEXT')
									<Field
										name={`${conditionName}.value.text`}
										component={TextField}
										hintText="Ingrese un valor"
										style={{width: "100%", marginBottom: '1rem'}}
									/>
							}
						}
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