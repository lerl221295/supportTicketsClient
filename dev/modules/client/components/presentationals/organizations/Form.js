import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Person from 'material-ui/svg-icons/action/account-circle'
import Organization from 'material-ui/svg-icons/communication/business'
import Image from 'material-ui/svg-icons/image/image'
import Home from 'material-ui/svg-icons/action/home'
import Description from 'material-ui/svg-icons/action/description'
import Phone from 'material-ui/svg-icons/communication/phone'
import Email from 'material-ui/svg-icons/communication/contact-mail'

import InputWithIcon from '../../../../../common/components/InputWithIcon'

const styles = {
    img: {
      width: 100,
      height: 120,
      borderRadius: 20,
      marginRight: 40
    },
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
    name: "",
    about: "",
    domains: ""
  }

  render = () => {
    return (
        <form>
          <Row>
            <Row>
              <Col xsOffset={1} xs={4} md={4} sm={12}>
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
                    Icon={Home}
                    Input={TextField}
                    hintText="Escriba la descripcion"
                    floatingLabelText="Acerca de"
                    value={this.props.about}
                    name="about"
                    onChange={this.props.handleChange}
                    multiLine={true}
                    rows={2}
                    rowsMax={6}
                />
                <InputWithIcon
                    Icon={Home}
                    Input={TextField}
                    hintText="Escriba los dominios separados por ,"
                    floatingLabelText="Dominios"
                    value={this.props.about}
                    name="domains"
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
                  onClick={()=> { this.props.close(); this.props.clean()} }
                />
                <FlatButton
                  label="Guardar"
                  primary={true}
                  onClick={this.props.enviar}
                />
              </Col>
            </Row>
          </Row>
        </form>

    )
  }
}


export default Form