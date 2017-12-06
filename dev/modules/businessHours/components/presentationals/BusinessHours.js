import React from 'react'
import { Paper } from 'material-ui'
import { Field } from 'redux-form'
import {
  Toggle
} from 'redux-form-material-ui'
import moment from 'moment'
import { Row, Col } from 'react-flexbox-grid'
import { WrappedSubheader, Loading } from '../../../../common/components'

import Theme from '../../../../theme-default'

import WorkingDaysForm from '../containers/WorkingDays'
import SenderContainer from '../containers/SenderContainer'
import Holidays from './Holidays'
import NewHoliday from './NewHoliday'

export default ({loading, workingDays, ...props}) => {
	if(loading) return <Loading />;
	return(
		<Row center="xs" style={{marginTop: '3rem'}}>
			<Col xs={8}>
				<WrappedSubheader>
					Horario Habil
				</WrappedSubheader>
				<Paper style={{padding: "2rem"}}>
					<Col xs={8}>
						<Field 
							name="twentyfour_seven" 
							component={Toggle} 
							label="Laborar 24 horas, los 7 dias de la semana"
							labelStyle={{color: Theme.palette.accent1Color, 'fontWeight': 'bold'}}
						/>
					</Col>
					<Row middle="xs" start="xs">
						<Col xs={12}>
							<WorkingDaysForm initialValues={workingDays} />
						</Col>
					</Row>
					<Row start="xs">
						<Col xs={12}>
							<Holidays />		
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<NewHoliday />
						</Col>
					</Row>	
					<Row>
						<SenderContainer />
					</Row>
				</Paper>
			</Col>
		</Row>
	)
}