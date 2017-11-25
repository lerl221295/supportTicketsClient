import React, { Component } from 'react'
import { RaisedButton, TextField, FlatButton, Paper } from 'material-ui'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Person from 'material-ui/svg-icons/action/account-circle'
import Organization from 'material-ui/svg-icons/communication/business'
import Image from 'material-ui/svg-icons/image/image'
import Home from 'material-ui/svg-icons/action/home'
import Description from 'material-ui/svg-icons/action/description'
import Phone from 'material-ui/svg-icons/communication/phone'
import Email from 'material-ui/svg-icons/communication/contact-mail'

import { InputWithIcon, ReactSelectWithIcon, AvatarImg, FormButtonGroup } from '../../../../../common/components'

class Form extends Component {
  static defaultProps = {
    name: "",
    lastname: "",
    phones: "",
    email: "",
    face_base64: null,
    address: "",
    organization_id: null
  }   

  render = () => {
    return (
      <Paper>
        <form className="padding">
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <AvatarImg
                face_base64={this.props.face_base64}
                avatar_filename={this.props.avatar_filename}
                changeImage={this.props.changeImage}
              />
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
                Icon={Email}
                Input={TextField}
                hintText="Escriba el email"
                floatingLabelText="Email"
                value={this.props.email}
                name="email"
                onChange={this.props.handleChange}
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <InputWithIcon
                Icon={Phone}
                Input={TextField}
                hintText="Escriba los telefonos"
                floatingLabelText="Telefonos"
                value={this.props.phones}
                name="phones"
                onChange={this.props.handleChange}
              />
              <InputWithIcon
                Icon={Home}
                Input={TextField}
                hintText="Escriba la ubicacion"
                floatingLabelText="Ubicacion"
                value={this.props.address}
                name="address"
                onChange={this.props.handleChange}
                multiLine={true}
                rows={2}
                rowsMax={6}
              />
              <InputWithIcon
                  Icon={Description}
                  Input={TextField}
                  hintText="Acerca del cliente"
                  floatingLabelText="Acerca de"
                  value={this.props.about}
                  name="about"
                  onChange={this.props.handleChange}
                  multiLine={true}
                  rows={2}
                  rowsMax={6}
              />
              <ReactSelectWithIcon
                Icon={Organization}
                label={"Organizacion"}
                value={this.props.organization}
                onChange={this.props.handleReactSelectChange("organization")}
                valueKey="id" labelKey="name"
                loadOptions={this.props.searchOrganizations}
                backspaceRemoves={true}
                placeholder="Seleccione la organizacion"
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
    )
  }
}


export default Form