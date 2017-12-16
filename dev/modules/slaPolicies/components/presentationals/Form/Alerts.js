import React from 'react'
// Material UI
import { Paper } from 'material-ui'
// React Flexbox Grid
import { Row } from "react-flexbox-grid";
// Presentationals Components
import RenderAlerts from './RenderAlerts'
// Redux Form
import { FieldArray } from "redux-form"

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

export default ({ searchData }) => (
	<Paper style={styles.paper}>
		<Row center={'xs'}>
			<h1 style={styles.title}>Alertas para cuando se venza o se acerque el vencimiento de una política SLA </h1>
		</Row>
		<Row bottom={"xs"}>
			<FieldArray name="alerts" searchData={searchData} component={RenderAlerts} />
		</Row>
	</Paper>
);