import React, { Component } from 'react'
import {
	Paper, IconButton, Subheader, FlatButton, FloatingActionButton, Toggle, Checkbox,
	TableHeader, Table, TableRow, TableHeaderColumn, TableRowColumn, TableBody, MenuItem,
	Step, Stepper, StepButton, StepContent
} from 'material-ui'
// Icons
import {
	ActionAccountCircle as Person
} from 'material-ui/svg-icons'
import { Row, Col } from 'react-flexbox-grid'
import {
	WrappedSubheader
} from '../../../../common/components'
import {
	TextField,
	SelectField
} from 'redux-form-material-ui'
// Redux Form Components
import { renderSelectReactField } from '../../../../common/components/ReduxFormComponents'
import {
	GetOrganizationsNames,
	GetClientsNames
} from '../../graphql/querys'
import {Field} from "redux-form";
import { PRIORITIES } from '../../../../common/utils/consts'

const UNITY_TIME = [
	{
		label:'Minutos',
		value:'MINUTES'
	},
	{
		label:'Horas',
		value:'HOURS'
	},
	{
		label:'Días',
		value:'DAYS'
	},
	{
		label:'Meses',
		value:'MONTHS'
	},
];

const OPERATIONALS_HOURS = [
	{
		label:'Horas calendario',
		value:'CALENDAR'
	},
	{
		label:'Horas laborales',
		value:'BUSINESS'
	}
];

const menuItemOptions = ( array ) => (array.map( (unity, i) => (
	<MenuItem key={i} value={unity.value} primaryText={unity.label} />
)));

class Form extends Component {
	
	state = {
		stepIndex: 0,
	};
	
	handleNext = () => {
		const {stepIndex} = this.state;
		if (stepIndex < 2) {
			this.setState({stepIndex: stepIndex + 1});
		}
	};
	
	handlePrev = () => {
		const {stepIndex} = this.state;
		if (stepIndex > 0) {
			this.setState({stepIndex: stepIndex - 1});
		}
	};
	
	render = () => {
		const {stepIndex} = this.state;
		
		return (
			<Paper>
				{/*HOLA MUNDO*/}
				<Row>
					<Col xs>
						{/*<FormSubheader
							id={this.props.id} edit={this.state.edit}
							back={this.props.cancel} onCheckHandler={this.onCheckHandler}>
							Cliente
						</FormSubheader>*/}
						<WrappedSubheader>
							Política SLA
						</WrappedSubheader>
					</Col>
        </Row>
				<form className="padding">
					<Row>
						<Col xs={12}>
							<Field
								name="name"
								component={TextField}
								floatingLabelText="Nombre de política SLA"
								style={{width: "100%"}}
							/>
							<Field
								name="description"
								component={TextField}
								floatingLabelText="Descripción de la política SLA"
								multiLine={true}
								rows={3}
								rowsMax={5}
								style={{width: "100%"}}
							/>
						</Col>
					</Row>
					<Row center={"xs"}>
						<Col xs={12}>
							Objetivos de la política SLA paja paja...
						</Col>
						<Table>
							<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
								<TableRow>
									<TableHeaderColumn>Prioridad</TableHeaderColumn>
									<TableHeaderColumn>Responder en</TableHeaderColumn>
									<TableHeaderColumn>Resolver en</TableHeaderColumn>
									<TableHeaderColumn>Horas operativas</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody displayRowCheckbox={false}>
								{
									PRIORITIES.map((priority, i) => (
										<TableRow key={i} selected={null}>
											<TableRowColumn>
												<p>{priority.text}</p>
											</TableRowColumn>
											<TableRowColumn>
												<Row>
													<Col xs={4}>
														<Field
															name={`policies[${i}].first_response.value`}
															component={TextField}
															type={'number'}
															hintText={"Tiempo"}
															style={{width: "100%"}}
														/>
													</Col>
													<Col xs={8}>
														<Field
															name={`policies[${i}].first_response.unity`}
															component={SelectField}
															hintText={"Unidad"}
															style={{width: "100%"}}
														>
															{menuItemOptions(UNITY_TIME)}
														</Field>
													</Col>
												</Row>
											</TableRowColumn>
											<TableRowColumn>
												<Row>
													<Col xs={4}>
														<Field
															name={`policies[${i}].solved.value`}
															component={TextField}
															hintText={"Tiempo"}
															type={'number'}
															style={{width: "100%"}}
														/>
													</Col>
													<Col xs={8}>
														<Field
															name={`policies[${i}].solved.unity`}
															component={SelectField}
															hintText={"Unidad"}
															style={{width: "100%"}}
														>
															{menuItemOptions(UNITY_TIME)}
														</Field>
													</Col>
												</Row>
											</TableRowColumn>
											<TableRowColumn>
												<Field
													name={`policies[${i}].operational_hours`}
													component={SelectField}
													hintText={"Horario de atención"}
													style={{width: "100%"}}
												>
													{menuItemOptions(OPERATIONALS_HOURS)}
												</Field>
											</TableRowColumn>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</Row>
					<Row>
						<Col xs={12}>
							<h1>Configurar alertas:</h1>
						</Col>
						<Col xs={12}>
							<Stepper linear={false} activeStep={stepIndex}>
								<Step>
									<StepButton onClick={() => this.setState({stepIndex: 0})}>
										Aplicar política a
									</StepButton>
								</Step>
								<Step>
									<StepButton onClick={() => this.setState({stepIndex: 1})}>
										Recordatorio vencimiento cercano del SLA
									</StepButton>
								</Step>
								<Step>
									<StepButton onClick={() => this.setState({stepIndex: 2})}>
										Alerta para incumplimiento de SLA
									</StepButton>
								</Step>
							</Stepper>
						</Col>
					</Row>
					{
						do {
							if (stepIndex === 0) (
								<Row bottom={"xs"} between={"xs"}>
									<Col xs={5}>
										<Field
											Icon={Person}
											name="clients"
											component={renderSelectReactField}
											label="Clientes"
											placeholder="Seleccione los clientes"
											loadOptions={this.props.searchData("clients", GetClientsNames)}
											multi
										/>
									</Col>
									<Col xs={5}>
										<Field
											Icon={Person}
											name="organizations"
											component={renderSelectReactField}
											label="Organizaciones"
											placeholder="Seleccione las organizaciones"
											loadOptions={this.props.searchData("organizations", GetOrganizationsNames)}
											multi
										/>
									</Col>
								</Row>
							)
							else null
						}
					}
				</form>
			</Paper>
		)
	}
}


export default Form