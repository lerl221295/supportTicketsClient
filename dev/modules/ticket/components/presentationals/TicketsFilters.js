// React
import React, { Component } from 'react'
// React - Redux
import { Field, reduxForm } from 'redux-form'
// Flexbox Grid
import { Row, Col } from 'react-flexbox-grid'
// Material-UI
import { Paper, FlatButton } from 'material-ui'
// Icons
import {
ActionAccountCircle as Person,
CommunicationBusiness as Organization
} from 'material-ui/svg-icons'
// Redux Form Components
import {
renderSelectField,
renderSelectReactField
} from '../../../../common/components/ReduxFormComponents'
// Common Components
import { WrappedSubheader } from '../../../../common/components'
// Graphql
import {
	GetOrganizationsNames,
	GetGroupsNames,
	GetSuppliersNames,
	GetAgentsNames,
	GetClientsNames
} from '../../graphql/querys'
// Utils
import { PRIORITIES, DUE_BY } from '../../../../common/utils/consts'

const styles = {
	paper: {
		// maxHeight: '33rem',
		maxHeight: window.innerHeight - 124,
		overflowY: 'auto',
		padding: '0rem 1rem'
	}
};

@reduxForm({ form: 'FilterForm' })
class FilterForm extends Component {
	render = () => {
		const { handleSubmit, pristine, reset, submitting, searchData } = this.props;
		return (
			<div>
				<WrappedSubheader>Filtrar Propiedades</WrappedSubheader>
				<Paper style={styles.paper}>
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
										fullWidth={true}
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