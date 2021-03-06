import React from 'react'
// Material UI
import { Paper, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui'
// Redux Form
import { Field } from 'redux-form'
import { TextField, SelectField } from 'redux-form-material-ui'
// React Flexbox Grid
import { Row, Col } from "react-flexbox-grid";
// Commons
import { menuItemOptions } from '../../../../../common/utils/generators'
import { PRIORITIES, OPERATIONALS_HOURS, UNITY_TIME } from '../../../../../common/utils/consts'

const styles = {
	paper: {
		padding: '1rem'
	},
	title: {
		fontSize: '1.3rem',
		fontWeight: '500',
		marginBottom: '1.5rem'
	}
};

export default () => (
	<Paper style={styles.paper}>
		<Row center={"xs"}>
			<Col xs={12}>
				<h1 style={styles.title}>Objetivos de la política SLA para las distintas prioridades del ticket</h1>
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
												min={1}
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
												min={1}
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
	</Paper>
);