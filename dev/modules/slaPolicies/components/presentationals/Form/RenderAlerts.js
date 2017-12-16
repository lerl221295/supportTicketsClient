import React from 'react'
// React Flexbox Grid
import {Row, Col} from "react-flexbox-grid"
// Material UI
import {Card, CardHeader, CardText, Divider, FlatButton, List, ListItem, Paper, Toggle} from "material-ui"
// Redux Form
import { Field } from 'redux-form'
import { EditorWrapper as Editor } from '../../../../../common/components/ReduxFormComponents'
import { TextField, SelectField } from 'redux-form-material-ui'
// Material Icons
import { ContentAddCircle as Add } from 'material-ui/svg-icons'
// Presentationals Components
import Item from './ItemListAlerts'
// Lodash
import _ from 'lodash'

export default ({ fields, searchData }) => {
	let alerts = fields.getAll();
	let mappedAlerts = [
		{
			type:'REMINDER',
			motive: 'RESPONSE',
			title: <span>Alerta para cuando se acerca el <strong>tiempo de respuesta</strong> del ticket</span>
		},
		{
			type:'REMINDER',
			motive: 'RESOLUTION',
			title: <span>Alerta para cuando se acerca el <strong>tiempo de resolución</strong> del ticket</span>
		},
		{
			type:'SLA_VIOLATION',
			motive: 'RESPONSE',
			title: <span>Alerta para cuando un ticket <strong>no es respondido</strong> a tiempo</span>
		},
		{
			type:'SLA_VIOLATION',
			motive: 'RESOLUTION',
			title: <span>Alerta para cuando un ticket <strong>no es resuelto</strong> a tiempo</span>
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
	
	const styles = {
		alertType: {
			fontWeight: '400'
		}
	}
	
	return (
		<Col xs={12}>
			{mappedAlerts.map(({alert, title, type, motive}, i) => (
				<Row key={i} bottom={"xs"} >
					<Col>
						<h1 style={styles.alertType}>{title} </h1>
					</Col>
					<Col>
						<Toggle
							toggled={
								do {
									if (alert) true;
									else false;
								}
							}
							onToggle={(e, value) => {
								if (value)
									fields.push({type, motive});
								else
									fields.remove(alert.index);
							}}
						/>
					</Col>
					{
						do {
							if (alert) (
								<Col xs={12}>
									<Col xs={12}>
										<List>
											<ListItem key={i} containerElement={<Item {...alert} searchData={searchData} />}/>
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
												<Field
													name={`alerts[${alert.index}].message`}
													component={Editor}
													toolbar={{
														options: [
															'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'
														]
													}}
													editorClassName="rich-editor"
												/>
											</CardText>
										</Card>
									</Col>
									<br/>
									<Divider />
									<br/>
								</Col>
							)
						}
					}
				</Row>
			))}
		</Col>
	);
};