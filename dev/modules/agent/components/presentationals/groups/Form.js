import React, { Component } from 'react'
import {  TextField, Divider, Paper } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { Editor } from 'react-draft-wysiwyg';
// Íconos
import Person from 'material-ui/svg-icons/action/account-circle'
import Description from 'material-ui/svg-icons/action/description'
import People from 'material-ui/svg-icons/social/people'
// Componentes comunes
import { InputWithIcon, ReactSelectWithIcon, FormButtonGroup, FormSubheader } from '../../../../../common/components'

class Form extends Component {
	constructor(props) {
		super(props);
		
		// Opciones disponibles en el toolbar del editor enriquecido
		this.toolbar = {
			options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
		};
	}
	
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
			<Row center="xs" middle="xs">
				<Col xs={10}>
					<Paper>
						<Row start={"xs"}>
							<Col xs>
								<FormSubheader
									id={this.props.id} edit={this.state.edit}
									back={this.props.cancel} onCheckHandler={this.onCheckHandler}>
									Grupo
								</FormSubheader>
							</Col>
						</Row>
						<form className={"padding"}>
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
										name="about"
										onChange={this.props.handleChange}
										multiLine={true}
										rowsMax={3}
										value={this.props.about}
										disabled={!this.state.edit}
									
									/>
									<ReactSelectWithIcon
										Icon={People}
										label={"Agentes"}
										multi={true}
										onChange={this.props.handleReactSelectChange("agents")}
										valueKey="id" labelKey="name"
										loadOptions={this.props.searchAgents}
										backspaceRemoves={true}
										placeholder="Seleccione un agent"
										autoload={false}
										filterOption={() => (true)}
										value={this.props.agents}
										disabled={!this.state.edit}
									/>
									<ReactSelectWithIcon
										Icon={People}
										label={"Grupo de escalado"}
										onChange={this.props.handleReactSelectChange("group_scale")}
										valueKey="id" labelKey="name"
										loadOptions={this.props.searchGroups}
										placeholder="Seleccione un grupo de escalado"
										autoload={false}
										filterOption={() => (true)}
										value={this.props.group_scale}
										disabled={!this.state.edit}
									/>
									<br/><Divider /><br/>
									{/*<strong><label>Notificación luego que ha pasado un tiempo sin que un ticket sea tomado por el grupo</label></strong>*/}
									<h3 className={"center-align"}> Envío de notificación </h3>
									<Row bottom={"xs"}>
										<Col xs={6}>
											<h5 className={'label-description right-align'}>
												Si un ticket permanece sin asignar por más de:
											</h5>
										</Col>
										<Col xs={3}>
											<TextField
												type={"number"}
												hintText="tiempo"
												value={this.props.notification_hours}
												disabled={!this.state.edit}
												name="notification_hours"
												onChange={this.props.handleChange}
												multiLine={false}
												style={{width: '100%'}}
											/>
										</Col>
										<Col xs>
											<h5 className={'label-description left-align'}>
												Horas
											</h5>
										</Col>
									</Row>
									<Row bottom={"xs"}>
										<Col xs={6}>
											<h5 className={'label-description right-align'}>
												...enviar correo a:
											</h5>
										</Col>
										<Col xs={4}>
											<ReactSelectWithIcon
												onChange={this.props.handleReactSelectChange("notification_agent")}
												valueKey="id" labelKey="name"
												loadOptions={this.props.searchAgents}
												placeholder="Seleccione agente"
												autoload={false}
												filterOption={() => (true)}
												value={this.props.notification_agent}
												disabled={!this.state.edit}
											/>
										</Col>
									</Row>
									<Editor
										toolbar={this.toolbar}
										editorState={this.props.editorState}
										editorClassName="rich-editor"
										onEditorStateChange={this.props.handleEditorChange}
										readOnly={!this.state.edit}
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
					</Paper>
				</Col>
			</Row>
		)
	}
}

export default Form