import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Paper, Divider, FlatButton, Subheader } from 'material-ui'
import {
	renderSelectField,
	renderSelectReactField
} from '../../../../common/components/ReduxFormComponents'

import {typography} from 'material-ui/styles';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/action/account-circle'
import Organization from 'material-ui/svg-icons/communication/business'
import { Row, Col } from 'react-flexbox-grid'
import GetOrganizationsNames from '../../graphql/querys/organizationsNames.graphql'
import GetGroupsNames from '../../graphql/querys/groupsNames.graphql'
import GetSuppliersNames from '../../graphql/querys/suppliersNames.graphql'
import GetAgentsNames from '../../graphql/querys/agentsNames.graphql'
import GetClientsNames from '../../graphql/querys/clientsNames.graphql'

import { PRIORITIES, DUE_BY } from '../../../../common/utils/consts'

const styles = {
	subheader: {
		fontSize: 24,
		fontWeight: typography.fontWeightLight,
		backgroundColor: grey400,
		color: white
	}
};

@reduxForm({ form: 'FilterForm' })
class FilterForm extends Component {
	render = () => {
		const { handleSubmit, pristine, reset, submitting, searchData } = this.props;
		return (
			<div>
				<Subheader style={styles.subheader}>Filtrar Propiedades</Subheader>
				<Paper style={{height: '32rem', overflowY: 'auto', padding: "1rem"}}>
					<form onSubmit={handleSubmit}>
						<Field
							Icon={Person}
							name="clients"
							component={renderSelectReactField}
							label="Clientes"
							placeholder="Seleccione los clientes"
							loadOptions={searchData("clients", GetClientsNames)}
							multi
						/>
						<Field
							Icon={Person}
							name="agents"
							component={renderSelectReactField}
							label="Agentes"
							placeholder="Seleccione los agentes"
							loadOptions={searchData("agents", GetAgentsNames)}
							multi
						/>
						<Field
							Icon={Organization}
							name="organizations"
							component={renderSelectReactField}
							label="Organizaciones"
							placeholder="Seleccione las organizaciones"
							loadOptions={searchData("organizations", GetOrganizationsNames)}
							multi
						/>
						<Field
							Icon={Organization}
							name="suppliers"
							component={renderSelectReactField}
							label="Proveedores"
							placeholder="Seleccione los proveedores"
							loadOptions={searchData("suppliers", GetSuppliersNames)}
							multi
						/>
						<Field
							Icon={Organization}
							name="groups"
							component={renderSelectReactField}
							label="Grupos"
							placeholder="Seleccione los grupos"
							loadOptions={searchData("groups", GetGroupsNames)}
							multi
						/>
						<Field
							Icon={Person}
							name="priorities"
							component={renderSelectField}
							label="Prioridades"
							multiple
							options={PRIORITIES}
						/>
						{
							do {
								if(!this.props.data.loading && !this.props.data.error)
									<Field
										Icon={Person}
										name="types_keys"
										component={renderSelectField}
										label="Tipos"
										multiple
										options={this.props.data.ticketMetadata.ticketTypes.map(({key, label}) => ({value: key, text: label}))}
									/>
							}
						}
						{
							do {
								if(!this.props.data.loading && !this.props.data.error)
									<Field
										Icon={Person}
										name="states_keys"
										component={renderSelectField}
										label="Estatus"
										multiple
										options={this.props.data.ticketMetadata.ticketStatus.map(({key, label}) => ({value: key, text: label}))}
									/>
							}
						}
						<Field
							Icon={Person}
							name="due_by"
							component={renderSelectField}
							label="Hecho en"
							multiple
							options={DUE_BY}
						/>
						<Col xs={12} md={12} sm={12}>
							<Row center="xs">
								<Col xs={6} md={6} sm={6}>
									<FlatButton
										label="Limpiar"
										primary={true}
										onClick={reset}
									/>
								</Col>
							</Row>
						</Col>
					</form>
				</Paper>
			</div>
		)

	}
}

export default FilterForm