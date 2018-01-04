import React from 'react'
import { Col, Row } from "react-flexbox-grid"
import { Paper } from 'material-ui'
import { WrappedSubheader, Loading } from '../../../../../common/components'
import Pie from '../PieChart'
import {
	ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar,
	//PieChart, Pie, Sector
} from 'recharts';

const styles = {
	paper: {
		// height: '27rem',
		height: "25rem",
		padding: '0.7rem'
	}
};

export default ({data}) => {
	if(data.loading && !data.ticketsByPriority) return <Loading/>
	return(
		<div>
			<Row style={{marginBottom: "1rem"}}>
				<Col xs={6}>
					<WrappedSubheader>Tickets Agrupados por Prioridad</WrappedSubheader>
					<Paper style={styles.paper}>
						<Pie data={data.ticketsByPriority} dataKey="tickets" keyName="priority"/>
					</Paper>
				</Col>
				<Col xs={6}>
					<WrappedSubheader>Tickets agrupados por Tipo</WrappedSubheader>
					<Paper style={styles.paper}>
						<ResponsiveContainer>
							<BarChart data={data.ticketsByType}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="type" />
								<YAxis />
								<Tooltip payload={data.ticketsByType}/>
								<Bar type="monotone" dataKey="tickets" fill="#8884d8" barSize={10}/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Col>
			</Row>
			<Row>
				<Col xs={6}>
					<WrappedSubheader>Tickets agrupados por Cantidad de Intervenciones</WrappedSubheader>
					<Paper style={styles.paper}>
						<ResponsiveContainer>
							<BarChart data={data.ticketsByInterventionCount}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="interventions" />
								<YAxis />
								<Tooltip payload={data.ticketsByInterventionCount}/>
								<Bar type="monotone" dataKey="tickets" fill="#8884d8" barSize={10}/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Col>
				<Col xs={6}>
					<WrappedSubheader>Tickets Agrupados por Fuente</WrappedSubheader>
					<Paper style={styles.paper}>
						<Pie data={data.ticketsBySource} dataKey="tickets" keyName="source"/>
					</Paper>
				</Col>
			</Row>
		</div>
	)
}