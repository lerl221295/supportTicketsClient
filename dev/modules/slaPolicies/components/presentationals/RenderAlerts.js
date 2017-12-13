import React from 'react'
import {Row, Col} from "react-flexbox-grid"
import {Card, CardHeader, CardText, Divider, FlatButton, List, ListItem, Paper} from "material-ui"
import { ContentAddCircle as Add } from 'material-ui/svg-icons'
import Item from './ItemListAlerts'
import _ from 'lodash'

export default ({ fields, searchData }) => {
	// console.log('fieldsObject-----', fields);
	console.log('fieldsValues-----', fields.getAll());
	let alerts = fields.getAll();
	let mappedAlerts = [
		{
			type:'REMINDER',
			motive: 'RESPONSE',
			title: 'Alertas para cuando se acerca tiempo de respuesta del ticket'
		},
		{
			type:'REMINDER',
			motive: 'RESOLUTION',
			title: 'Alertas para cuando se acerca tiempo de resolución del ticket'
		},
		{
			type:'SLA_VIOLATION',
			motive: 'RESPONSE',
			title: 'Alertas para cuando un ticket no es respondido a tiempo'
		},
		{
			type:'SLA_VIOLATION',
			motive: 'RESOLUTION',
			title: 'Alertas para cuando un ticket no es resuelto a tiempo'
		}
	];
	
	_.forEach(alerts, (alert, index) => {
		if (alert.type === 'REMINDER')
			if (alert.motive === 'RESPONSE') mappedAlerts[0].alert = {...alert, index};
			else mappedAlerts[1].alert = {...alert, index};
		else
			if (alert.motive === 'RESPONSE') mappedAlerts[2].alert = {...alert, index};
			else mappedAlerts[3].alert = {...alert, index};
	});
	
	/*console.log(
		'reminderResponse---', reminderResponse,
		'reminderResolution---', reminderResolution,
		'slaViolationResponse---', slaViolationResponse,
		'slaViolationResolution---', slaViolationResolution,
	);*/
	
	return (
		<Row bottom={"xs"}>
			{/*<Col xs={12}>
				<h1>Configurar alertas para cuando se acerque tiempo de vencimiento del SLA</h1>
			</Col>*/}
			<Col xs={12}>
				<Paper style={{padding: '1rem'}}>
					{mappedAlerts.map(({alert, title, type, motive}, i) => (
						<Row key={i} bottom={"xs"} >
							<Col xs={9}>
								<h1>{title}</h1>
							</Col>
							<Col xs>
								<Row end={'xs'}>
									<FlatButton
										label="Agregar alerta"
										labelPosition="before"
										primary={true}
										icon={<Add />}
										disabled={
											do {
												if (alert) true;
												else false;
											}
										}
										onClick={() => fields.push({type, motive})}
									/>
								</Row>
							</Col>
							{
								do {
									if (alert) (
										<Col xs={12}>
											<Col xs={12}>
												<List>
													<ListItem key={i} containerElement={<Item {...alert} remove={fields.remove} searchData={searchData} />}/>
												</List>
											</Col>
											<Col xs={12}>
												<Card>
													<CardHeader
														title="Mensaje a enviar a los agentes en la alerta configurada"
														actAsExpander={true}
														showExpandableButton={true}
													/>
													<CardText expandable={true}>
														Aquí va el texto enriquecido
													</CardText>
												</Card>
											</Col>
											<br/>
											<Divider />
										</Col>
									)
									else null
								}
							}
						</Row>
					))}
				</Paper>
			</Col>
		</Row>
	);
};