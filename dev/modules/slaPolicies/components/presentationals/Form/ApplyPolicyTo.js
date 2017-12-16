import React from 'react'
// Material UI
import { Paper } from 'material-ui'
// Material Icons
import { ActionAccountCircle as Person } from 'material-ui/svg-icons'
// React Flexbox Grid
import { Row, Col } from 'react-flexbox-grid'
// Redux Form
import { Field } from "redux-form"
// Common Components
import { renderSelectReactField } from '../../../../../common/components/ReduxFormComponents'
// Graphql Querys
import { GetOrganizationsNames, GetClientsNames } from '../../../graphql/querys'

const styles = {
	paper: {
		padding: '1rem'
	},
	title: {
		fontSize: '1.3rem',
		fontWeight: '500',
		marginBottom: '1.5rem'
	},
};

export default ({ searchData }) => (
	<Paper style={styles.paper}>
		<Row bottom={"xs"}>
			<Col xs={12}>
				<Row center={'xs'}>
					<h1 style={styles.title}>Política SLA aplicada a</h1>
				</Row>
			</Col>
			<Col xs={6}>
				<Field
					Icon={Person}
					name="clients"
					component={renderSelectReactField}
					label="Clientes"
					placeholder="Seleccione los clientes"
					loadOptions={searchData("clients", GetClientsNames)}
					multi
				/>
			</Col>
			<Col xs={6}>
				<Field
					Icon={Person}
					name="organizations"
					component={renderSelectReactField}
					label="Organizaciones"
					placeholder="Seleccione las organizaciones"
					loadOptions={searchData("organizations", GetOrganizationsNames)}
					multi
				/>
			</Col>
		</Row>
	</Paper>
)