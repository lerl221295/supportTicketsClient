import React from 'react'
// Redux Form
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
// React Flexbox Grid
import { Row, Col } from "react-flexbox-grid";

const styles = {
	field: {
		width: "100%"
	}
};

export default () => (
	<Row>
		<Col xs={12}>
			<Field
				name="name"
				component={TextField}
				floatingLabelText="Nombre del despachador"
				style={styles.field}
			/>
		</Col>
		<Col xs={12}>
			<Field
				name="description"
				component={TextField}
				floatingLabelText="Descripción del despachador"
				multiLine={true}
				rows={3}
				rowsMax={5}
				style={styles.field}
			/>
		</Col>
	</Row>
);