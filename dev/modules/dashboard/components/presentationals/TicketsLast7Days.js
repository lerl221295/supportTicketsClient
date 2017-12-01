import React from 'react';
// Material UI
import {Subheader, Paper} from "material-ui";
// Flexbox Grid
import { Row, Col } from 'react-flexbox-grid';
// Recharts
import {
	ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart,	Bar
} from 'recharts';

const styles = {
	paper: {
		height: '27rem',
		padding: '0.7rem'
	}
};

export default ({ticketsCountByDay}) => {
	return (
		<Row>
			<Col xs={12}>
				<Subheader className={"subheader"}>Tickets creados en los últimos 7 días</Subheader>
				<Paper style={styles.paper}>
					<ResponsiveContainer>
						<BarChart data={ticketsCountByDay}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="day" />
							<YAxis />
							<Tooltip payload={ticketsCountByDay}/>
							<Bar type="monotone" dataKey="tickets" fill="#8884d8" barSize={10}/>
						</BarChart>
					</ResponsiveContainer>
				</Paper>
			</Col>
		</Row>
	);
}