import React from 'react'
import {Paper, IconButton, FloatingActionButton} from 'material-ui'
// Icons
import {
	ActionAccountCircle as Person,
	ContentSave as Save,
	NavigationArrowBack as Back
} from 'material-ui/svg-icons'
import { Row, Col } from 'react-flexbox-grid'
import { WrappedSubheader, FormButtonGroup } from '../../../../common/components'
import RenderAlerts from './RenderAlerts'
import { TextField } from 'redux-form-material-ui'
// Redux Form Components
import { renderSelectReactField } from '../../../../common/components/ReduxFormComponents'
import { GetOrganizationsNames, GetClientsNames } from '../../graphql/querys'
import { Field, FieldArray } from "redux-form"
import PoliciesTable from './PoliciesTable'

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

export default ({ searchData, goBack, handleSubmit, dirty }) => {
	return (
		<Paper>
			<Row>
				<Col xs>
					<WrappedSubheader>
						<Row center={'xs'} middle={'xs'}>
							<Col xs={1}>
								<FloatingActionButton
									iconStyle={{color: '#fff'}}
									style={{marginBottom:'0.5rem'}}
									onClick={goBack}
									zDepth={0}
									mini
								>
									<Back />
								</FloatingActionButton>
							</Col>
							<Col xs={10}>
								Política SLA
							</Col>
							<Col xs={1}>
								<FloatingActionButton
									iconStyle={{color: '#fff'}}
									style={{marginBottom:'0.5rem'}}
									zDepth={0}
									disabled={!dirty}
									onClick={() => {handleSubmit()}}
									mini
								>
									<Save />
								</FloatingActionButton>
							</Col>
						</Row>
					</WrappedSubheader>
				</Col>
			</Row>
			<form className="padding">
				<Row>
					<Col xs={12}>
						<Field
							name="name"
							component={TextField}
							floatingLabelText="Nombre de política SLA"
							style={{width: "100%"}}
						/>
					</Col>
					<Col xs={12}>
						<Field
							name="description"
							component={TextField}
							floatingLabelText="Descripción de la política SLA"
							multiLine={true}
							rows={3}
							rowsMax={5}
							style={{width: "100%"}}
						/>
					</Col>
				</Row>
				<br/>
				<Paper style={styles.paper}>
					<Row center={"xs"}>
						<Col xs={12}>
							<h1 style={styles.title}>Objetivos de la política SLA para las distintas prioridades del ticket</h1>
						</Col>
						<PoliciesTable/>
					</Row>
				</Paper>
				<br/>
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
				<br/>
				<Paper style={styles.paper}>
					<Row center={'xs'}>
						<h1 style={styles.title}>Alertas para cuando se venza o se acerque el vencimiento de una política SLA </h1>
					</Row>
					<Row bottom={"xs"}>
						<FieldArray name="alerts" searchData={searchData} component={RenderAlerts} />
					</Row>
				</Paper>
				<FormButtonGroup
					cancel={goBack}
					send={() => {handleSubmit()}}
					disabled={!dirty}
				/>
			</form>
		</Paper>
	);
}