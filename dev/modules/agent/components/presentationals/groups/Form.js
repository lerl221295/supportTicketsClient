import React, { Component } from 'react'
import {  TextField, Divider } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { Editor } from 'react-draft-wysiwyg';
// Íconos
import Person from 'material-ui/svg-icons/action/account-circle'
import Description from 'material-ui/svg-icons/action/description'
import People from 'material-ui/svg-icons/social/people'
// Componentes comunes
import { InputWithIcon, ReactSelectWithIcon, FormButtonGroup } from '../../../../../common/components'

import stylesForm from '../../../../../styles/javascript/forms'

class Form extends Component {
	constructor(props) {
		super(props);
		
		// Opciones disponibles en el toolbar del editor enriquecido
		this.toolbar = {
			options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
		};
	}
	
		render = () => {
		return (
      <form style={stylesForm.padding}>
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
		        />
		        <br/><Divider /><br/>
		        <strong><label>Notificación luego que ha pasado un tiempo sin que un ticket sea tomado por el grupo</label></strong>
		        <Row middle={"xs"} end={"xs"}>
			        <Col xs={6}>
				        <h5 style={{fontSize: '0.7rem'}}>
					        Si un ticket permanece sin asignar por más de...
				        </h5>
			        </Col>
			        <Col xs={6}>
				        <TextField
				          type={"number"}
				          hintText="Ingrese tiempo en horas en que desea avisar a los agentes"
				          floatingLabelText="Tiempo de notificación"
				          value={this.props.notification_hours}
				          name="notification_hours"
				          onChange={this.props.handleChange}
				          multiLine={false}
				        />
			        </Col>
		        </Row>
		        <ReactSelectWithIcon
			        Icon={People}
			        label={"Agente que será notificado"}
			        onChange={this.props.handleReactSelectChange("notification_agent")}
			        valueKey="id" labelKey="name"
			        loadOptions={this.props.searchAgents}
			        placeholder="Seleccione agente a ser notificado"
			        autoload={false}
			        filterOption={() => (true)}
			        value={this.props.notification_agent}
		        />
		        <Editor
			        toolbar={this.toolbar}
			        editorState={this.props.editorState}
			        editorClassName="rich-editor"
			        onEditorStateChange={this.props.handleEditorChange}
		        />
          </Col>
	        <FormButtonGroup
		        stylesForm={stylesForm}
		        close={this.props.close}
		        clean={this.props.clean}
		        send={this.props.send}
	        />
        </Row>
      </form>
		
		)
	}
}

export default Form