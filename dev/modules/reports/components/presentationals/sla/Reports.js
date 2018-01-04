import React from 'react'
import { Col, Row } from "react-flexbox-grid"
import { Paper } from 'material-ui'
import { WrappedSubheader, Loading } from '../../../../../common/components'
import {
	ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar
} from 'recharts';

const styles = {
	paper: {
		// height: '27rem',
		height: "25rem",
		padding: '0.7rem'
	}
};


const CustomTooltip = (props) => {
	console.log(props)
	return(
		<span>hola</span>
	)
}

export default ({data}) => {
	if(data.loading && !data.complianceByType) return <Loading/>
	return(
		<div>
			<Row center="xs">
				<Col xs={6} style={{marginBottom: "1rem"}}>
					<WrappedSubheader>Cumplimiento SLA por tipos de Ticket</WrappedSubheader>
					<Paper style={styles.paper}>
						<ResponsiveContainer>
							<BarChart data={data.complianceByType}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="type" />
								<YAxis unit="%"/>
								<Tooltip payload={data.complianceByType}/>
								<Bar type="monotone" unit="%" dataKey="compliance.solved" name="Solucionados" fill="#8884d8" barSize={10}/>
								<Bar type="monotone" unit="%" dataKey="compliance.first_response" name="Primera Respuesta" fill="#8884d8" barSize={10}/>
								<Bar type="monotone" unit="%" dataKey="compliance.solved_after_fr" name="Solucionados tras Primera Respuesta" fill="#8884d8" barSize={10}/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Col>
				<Col xs={6} style={{marginBottom: "1rem"}}>
					<WrappedSubheader>Cumplimiento SLA por fuentes</WrappedSubheader>
					<Paper style={styles.paper}>
						<ResponsiveContainer>
							<BarChart data={data.complianceBySource}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="source"/>
								<YAxis unit="%"/>
								<Tooltip payload={data.complianceBySource}/>
								<Bar type="monotone" unit="%" dataKey="compliance.solved" name="Solucionados" fill="#8884d8" barSize={10}/>
								<Bar type="monotone" unit="%" dataKey="compliance.first_response" name="Primera Respuesta" fill="#8884d8" barSize={10}/>
								<Bar type="monotone" unit="%" dataKey="compliance.solved_after_fr" name="Solucionados tras Primera Respuesta" fill="#8884d8" barSize={10}/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Col>
				<Col xs={6}>
					<WrappedSubheader>Cumplimiento SLA por prioridades</WrappedSubheader>
					<Paper style={styles.paper}>
						<ResponsiveContainer>
							<BarChart data={data.complianceByPriority}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="priority" />
								<YAxis unit="%"/>
								<Tooltip payload={data.complianceByPriority}/>
								<Bar type="monotone" unit="%" dataKey="compliance.solved" name="Solucionados" fill="#8884d8" barSize={10}/>
								<Bar type="monotone" unit="%" dataKey="compliance.first_response" name="Primera Respuesta" fill="#8884d8" barSize={10}/>
								<Bar type="monotone" unit="%" dataKey="compliance.solved_after_fr" name="Solucionados tras Primera Respuesta" fill="#8884d8" barSize={10}/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Col>
			</Row>
		</div>
	)
}