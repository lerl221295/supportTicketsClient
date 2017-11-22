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
import ReactSelectWithIcon from '../../../../../common/components/ReactSelectWithIcon'

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
    lastname: "",
    phones: "",
    email: "",
    face_base64: null,
    address: "",
    organization_id: null
  }   

  render = () => {
    return (
        <form>
          <Row>
            <Row>
              <Col xsOffset={1} xs={4} md={4} sm={12}>
                {
                  do {
                    if(this.props.face_base64) 
                      (<img src={this.props.face_base64} style={styles.img}/>);
                    else
                      (<img src="images/user.png" style={styles.img}/>)
                  }
                }
                <RaisedButton
                  containerElement='label' // <-- Just add me!
                  label='Imagen de Perfil'>
                    <Image/>
                    <input accept="image/*" type="file" style={{ display: 'none' }} onChange={this.props.changeImage}/>
                </RaisedButton>
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
              <Col xsOffset={1} xs={4} md={4} sm={12}>
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