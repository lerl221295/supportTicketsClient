import React, { Component } from 'react'
import {  TextField } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
// Íconos
import Person from 'material-ui/svg-icons/action/account-circle'
import Description from 'material-ui/svg-icons/action/description'
import People from 'material-ui/svg-icons/social/people'
// Componentes comunes
import { InputWithIcon, ReactSelectWithIcon, FormButtonGroup } from '../../../../../common/components'

import stylesForm from '../../../../../styles/javascript/forms'


class Form extends Component {
	
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
		        <label>Notificar a agentes del grupo después que el ticket no haya sido tomado por ningún agente del grupo</label>
		        <InputWithIcon
			        Icon={Description}
			        Input={TextField}
			        type={"number"}
			        hintText="Ingrese tiempo en horas en que desea avisar a los agentes"
			        floatingLabelText="Tiempo de notificación"
			        value={this.props.notification_hours}
			        name="notification_hours"
			        onChange={this.props.handleChange}
			        multiLine={false}
		        />
		        <InputWithIcon
			        Icon={Description}
			        Input={TextField}
			        hintText="Ingrese texto del correo a enviar"
			        floatingLabelText="Mensaje a enviar"
			        value={this.props.notification_text}
			        name="notification_text"
			        onChange={this.props.handleChange}
			        multiLine={true}
			        rowsMax={3}
		        />
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