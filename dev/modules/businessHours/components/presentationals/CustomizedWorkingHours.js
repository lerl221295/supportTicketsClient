import React from 'react'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import { Field } from 'redux-form'
import {
  TimePicker,
  Checkbox
} from 'redux-form-material-ui'
import moment from 'moment'
import { Row, Col } from 'react-flexbox-grid'

import { WEEK_DAYS } from '../../../../common/utils/consts'

export default (props) => {
	return(
		<List>
			<Subheader>Dias Laborables</Subheader>
			{
				WEEK_DAYS.map(({value: day, text}) => {
					let diffHours = '';
					let diffMinutes = '';
					if(props[day] && props[day].start && props[day].end){
						diffHours = moment(props[day].end).diff(moment(props[day].start), 'hours');
						diffMinutes = moment(props[day].end).diff(moment(props[day].start).add(diffHours, 'hours'), 'minutes');
						if(diffHours && props[day]) diffHours = `${diffHours} hrs`;
						else diffHours = "";
						if(diffMinutes && props[day]) diffMinutes = `${diffMinutes} mns`;
						else diffMinutes = "";
					}
					
					return(
						<div key={day}>
							<ListItem>
								<Row middle="xs">
									<Col xs={3}>
										<Field name={`${day}.workeable`} 
											component={Checkbox} 
											label={text}
										/>
									</Col>
									<Col xs={2}>
										<Field
											textFieldStyle={{width: "100%"}}
											component={TimePicker}
											format={null}
											name={`${day}.start`}
								          	hintText="Comienza"
								          	disabled={!props[day]}
								        />
									</Col>
									<Col xs={2}>
										Hasta
									</Col>
									<Col xs={2}>
										<Field
											textFieldStyle={{width: "100%"}}
											component={TimePicker}
											format={null}
											name={`${day}.end`}
								          	hintText="Termina"
								          	disabled={!props[day]}
								        />
									</Col>
									<Col xs={3}>
										{diffHours} {diffMinutes}
									</Col>
								</Row>
							</ListItem>
							<Divider />
						</div>
					)
				})
			}
		</List>
	)
}