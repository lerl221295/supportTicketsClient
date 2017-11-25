import React, { Component } from 'react'
import { MenuItem, TextField, SelectField,	Divider, FlatButton } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
// Íconos
import Person from 'material-ui/svg-icons/action/account-circle'
import Home from 'material-ui/svg-icons/action/home'
import Description from 'material-ui/svg-icons/action/description'
import Identy from 'material-ui/svg-icons/action/perm-identity'
import Wc from 'material-ui/svg-icons/notification/wc'
import Phone from 'material-ui/svg-icons/communication/phone'
import Email from 'material-ui/svg-icons/communication/contact-mail'
import People from 'material-ui/svg-icons/social/people'
// Componentes comunes
import { InputWithIcon, ReactSelectWithIcon, AvatarImg, FormButtonGroup } from '../../../../../common/components'


class Form extends Component {
	render = () => {
		return (
      <form className="padding">
        <Row>
	        {/*COLUMNA DE LA IZQUIERDA*/}
	        <Col xs={12} sm={12} md={6} lg={6}>
            <AvatarImg
	            face_base64={this.props.face_base64}
	            avatar_filename={this.props.avatar_filename}
	            changeImage={this.props.changeImage}/>
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
              Icon={Person}
              Input={TextField}
              hintText="Escriba el apellido"
              floatingLabelText="Apellido"
              value={this.props.lastname}
              name="lastname"
              onChange={this.props.handleChange}
            />
            <InputWithIcon
	            Icon={Wc}
	            Input={SelectField}
	            floatingLabelText="Sexo"
	            value={this.props.sex}
	            onChange={this.props.handleSelectChange('sex')}
            >
	            <MenuItem value={"MALE"} primaryText="Hombre" />
	            <MenuItem value={"FEMALE"} primaryText="Mujer" />
            </InputWithIcon>
            <InputWithIcon
              Icon={Email}
              Input={TextField}
              hintText="Escriba el email"
              floatingLabelText="Email"
              value={this.props.email}
              name="email"
              onChange={this.props.handleChange}
            />
            <InputWithIcon
	            Icon={Phone}
	            Input={TextField}
	            hintText="Escriba los telefonos"
	            floatingLabelText="Telefonos"
	            value={this.props.phones}
	            name="phones"
	            onChange={this.props.handleChange}
            />
          </Col>
          {/*COLUMNA DE LA DERECHA*/}
          <Col xs={12} sm={12} md={6} lg={6}>
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
            <InputWithIcon
              Icon={Home}
              Input={TextField}
              hintText="Escriba la profesión"
              floatingLabelText="Profesión"
              value={this.props.profession}
              name="profession"
              onChange={this.props.handleChange}
            />
            <InputWithIcon
	            Icon={Identy}
	            Input={SelectField}
	            floatingLabelText="Role de usuario"
	            value={this.props.role}
	            onChange={this.props.handleSelectChange('role')}
            >
	            <MenuItem value={"AGENT"} primaryText="Agente" />
	            <MenuItem value={"SUPERVISOR"} primaryText="Supervisor" />
	            <MenuItem value={"ADMIN"} primaryText="Administrador" />
            </InputWithIcon>
            <ReactSelectWithIcon
	            Icon={People}
	            label={"Proveedor"}
	            value={this.props.supplier}
	            onChange={this.props.handleReactSelectChange("supplier")}
	            valueKey="id" labelKey="name"
	            loadOptions={this.props.searchSuppliers}
	            backspaceRemoves={true}
	            placeholder="Seleccione un proveedor"
	            autoload={false}
	            filterOption={() => (true)}
            />
            <ReactSelectWithIcon
	            Icon={People}
	            label={"Grupos"}
	            multi={true}
	            value={this.props.groups}
	            onChange={this.props.handleReactSelectChange("groups")}
	            valueKey="id" labelKey="name"
	            loadOptions={this.props.searchGroups}
	            backspaceRemoves={true}
	            placeholder="Seleccione los grupos"
	            autoload={false}
	            filterOption={() => (true)}
            />
          </Col>
	        <FormButtonGroup
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