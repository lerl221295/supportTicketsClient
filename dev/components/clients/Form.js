import React, { Component } from 'react'
//import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import DatePicker from 'material-ui/DatePicker'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Person from 'material-ui/svg-icons/action/account-circle'
import Home from 'material-ui/svg-icons/action/home'
import Huella from 'material-ui/svg-icons/action/fingerprint'
import Phone from 'material-ui/svg-icons/communication/phone'
import Email from 'material-ui/svg-icons/communication/contact-mail'

import InputWithIcon from '../InputWithIcon'


const styles = {
    
    buttons: {
      marginTop: 30,
      float: 'right'
    },
    saveButton: {
      marginLeft: 5
    }
  };


class Form extends Component {
  static defaultProps = {
    nombre: "",
    apellido: "",
    identificacion: "",
    telefono: "",
    email: "",
    ubicacion: ""
  }   

  render = () => (
      <form>
        <Row>
          <Col xsOffset={1} xs={4} md={4} sm={12}>
            <InputWithIcon
              Icon={Person}
              Input={TextField}
              hintText="Escriba el nombre"
              floatingLabelText="Nombre"
              name="nombre"
              onChange={this.props.handleChange}
              value={this.props.nombre}
            />
            <InputWithIcon
              Icon={Person}
              Input={TextField}
              hintText="Escriba el apellido"
              floatingLabelText="Apellido"
              value={this.props.apellido}
              name="apellido"
              onChange={this.props.handleChange}
            />
            <InputWithIcon
              Icon={Huella}
              Input={TextField}
              hintText="Escriba la identificacion"
              floatingLabelText="Identificacion"
              value={this.props.identificacion}
              name="identificacion"
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
          <Col xsOffset={1} xs={4} md={4} sm={12}>
            <InputWithIcon
              Icon={Phone}
              Input={TextField}
              hintText="Escriba el telefono"
              floatingLabelText="Telefono"
              value={this.props.telefono}
              name="telefono"
              onChange={this.props.handleChange}
            />
            <InputWithIcon
              Icon={Home}
              Input={TextField}
              hintText="Escriba la ubicacion"
              floatingLabelText="Ubicacion"
              value={this.props.ubicacion}
              name="ubicacion"
              onChange={this.props.handleChange}
              multiLine={true}
              rows={2}
              rowsMax={6}
            />
          </Col>
          
          <Col xsOffset={8} xs={4} md={4} sm={6}>
            <FlatButton
              label="Cancelar"
              primary={true}
              onClick={this.props.close}
            />
            <FlatButton
              label="Guardar"
              primary={true}
              onClick={this.props.enviar}
            />
          </Col>
        </Row>
      </form>
    
  )
}


export default Form