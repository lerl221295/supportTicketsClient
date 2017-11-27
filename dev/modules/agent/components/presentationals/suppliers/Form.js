import React, { Component } from 'react'
import {  TextField, Paper } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
// Íconos
import Person from 'material-ui/svg-icons/action/account-circle'
import Description from 'material-ui/svg-icons/action/description'
import People from 'material-ui/svg-icons/social/people'
// Componentes comunes
import { InputWithIcon, ReactSelectWithIcon, FormButtonGroup } from '../../../../../common/components'


class Form extends Component {
	
	render = () => {
		return (
			<Row center="xs" middle="xs">
				<Paper style={{width: "40%"}}>
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
				        />
				        <InputWithIcon
				            Icon={Description}
				            Input={TextField}
				            hintText="Acerca del agente"
				            floatingLabelText="Acerca de"
				            value={this.props.about}
				            name="about"
				            onChange={this.props.handleChange}
				            multiLine={true}
				            rowsMax={3}
				        />
				        <ReactSelectWithIcon
				            Icon={People}
				            label={"Agentes"}
				            multi={true}
				            value={this.props.agents}
				            onChange={this.props.handleReactSelectChange("agents")}
				            valueKey="id" labelKey="name"
				            loadOptions={this.props.searchAgents}
				            backspaceRemoves={true}
				            placeholder="Seleccione un agent"
				            autoload={false}
				            filterOption={() => (true)}
				        />
				      </Col>
				        <FormButtonGroup
					        cancel={this.props.cancel}
					        send={this.props.send}
				        />
				    </Row>
				  </form>
				</Paper>
			</Row>	
		)
	}
}

export default Form