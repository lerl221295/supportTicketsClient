import React from 'react';
import {Col, Row} from "react-flexbox-grid";
import {Divider, List, ListItem, Paper} from "material-ui";
import _ from 'lodash';
import Item from './ItemListAlerts';

export default ({alerts, deleteAlert, searchData}) => {
	console.log('alerts----', alerts);
	let slaViolationResolution = [], slaViolationResponse = [], reminderResolution = [], reminderResponse = [];
	_.forEach(alerts, (alert, index) => {
		if (alert.type === 'SLA_VIOLATION')
			if (alert.motive === 'RESOLUTION') slaViolationResolution.push({...alert, index});
			else slaViolationResponse.push({...alert, index});
		else
			if (alert.motive === 'RESOLUTION') reminderResolution.push({...alert, index});
			else reminderResponse.push({...alert, index});
	});
	
	console.log(
		'reminderResponse---', reminderResponse,
		'reminderResolution---', reminderResolution,
		'slaViolationResponse---', slaViolationResponse,
		'slaViolationResolution---', slaViolationResolution,
	);
	
	return (
		<Row bottom={"xs"}>
			<Col xs={12}>
				<h1>Configurar alertas para cuando se acerque tiempo de vencimiento del SLA</h1>
			</Col>
			<Col xs={12}>
				<Paper>
					<Row bottom={"xs"}>
						<Col xs={12}>
							<h1>Alertas para cuando se acerca tiempo de respuesta del ticket <strong>Botón aquí</strong></h1>
						</Col>
						<Col xs={12}>
							<List>
								{
									reminderResponse.map( (alert, i) => <ListItem key={i} containerElement={<Item {...alert} searchData={searchData} index={i}/>}/> )
								}
							</List>
						</Col>
						<Divider />
						{/*<Col xs={12}>
							<h1>Alertas para cuando se acerca tiempo de resolución del ticket <strong>Botón aquí</strong></h1>
						</Col>
						<List>
							{
								reminderResolution.map( (alert, i) => <ListItem key={i} containerElement={<Item {...alert}/>}/> )
							}
						</List>
						<Divider />
						<Col xs={12}>
							<h1>Notificacion para cuando un ticket no se responde a tiempo <strong>Botón aquí</strong></h1>
						</Col>
						<List>
							{
								slaViolationResponse.map( (alert, i) => <ListItem key={i} containerElement={<Item {...alert}/>}/> )
							}
						</List>
						<Divider />
						<Col xs={12}>
							<h1>Notificacion para cuando un ticket no se resuelve a tiempo <strong>Botón aquí</strong></h1>
						</Col>
						<List>
							{
								slaViolationResolution.map( (alert, i) => <ListItem key={i} containerElement={<Item {...alert}/>}/> )
							}
						</List>
						<Divider />*/}
					</Row>
				</Paper>
			</Col>
		</Row>
	)
}