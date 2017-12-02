import React, { Component } from 'react'
import {  TextField, Paper } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
// Íconos
import Person from 'material-ui/svg-icons/action/account-circle'
import Description from 'material-ui/svg-icons/action/description'
import People from 'material-ui/svg-icons/social/people'
// Componentes comunes
import { InputWithIcon, ReactSelectWithIcon, FormButtonGroup, FormSubheader } from '../../../../../common/components'


class Form extends Component {
	
	state = {
		edit: true
	};
	
	componentWillReceiveProps = (nextProps) => {
		if (!this.props.id)
			this.state = {
				edit: do {
					if (nextProps.id) false;
					else true;
				}
			};
	};
	
	onCheckHandler = () => {
		this.setState({edit: !this.state.edit});
	};
	
	render = () => {
		return (
			<Row center="xs" middle="xs" style={{marginTop: '3rem'}}>
				<Col xs={5}>
					<Paper>
						<Row start="xs">
							<Col xs={12}>
								<FormSubheader
									id={this.props.id} edit={this.state.edit}
									back={this.props.cancel} onCheckHandler={this.onCheckHandler}>
									Proveedor
								</FormSubheader>
							</Col>
							<Col xs={12}>
								<form className={'padding'}>
									<Row>
										<Col xs={12} >
											<InputWithIcon
												Icon={Person}
												Input={TextField}
												hintText="Escriba el nombre"
												floatingLabelText="Nombre"
												name="name"
												onChange={this.props.handleChange}
												value={this.props.name}
												disabled={!this.state.edit}
											/>
											<InputWithIcon
												Icon={Description}
												Input={TextField}
												hintText="Acerca del agente"
												floatingLabelText="Acerca de"
												value={this.props.about}
												disabled={!this.state.edit}
												name="about"
												onChange={this.props.handleChange}
												multiLine={true}
												rowsMax={6}
											/>
											<ReactSelectWithIcon
												Icon={People}
												label={"Agentes"}
												multi={true}
												value={this.props.agents}
												disabled={!this.state.edit}
												onChange={this.props.handleReactSelectChange("agents")}
												valueKey="id" labelKey="name"
												loadOptions={this.props.searchAgents}
												backspaceRemoves={true}
												placeholder="Seleccione un agent"
												autoload={false}
												filterOption={() => (true)}
											/>
										</Col>
										{
											do {
												if (this.state.edit) (
													<FormButtonGroup
														cancel={this.props.cancel}
														send={this.props.send}
													/>
												)
												else ""
											}
										}
									</Row>
								</form>
							</Col>
						</Row>
					</Paper>
				</Col>
			</Row>
		)
	}
}

export default Form