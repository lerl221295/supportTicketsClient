import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Domain from 'material-ui/svg-icons/social/location-city'
import Home from 'material-ui/svg-icons/action/home'
import Description from 'material-ui/svg-icons/action/description'
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
            <Col xs={12} md={12} sm={12}>
              <InputWithIcon
                Icon={Domain}
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
                Icon={Email}
                Input={TextField}
                hintText="Escriba los dominios separados por ,"
                floatingLabelText="Dominios"
                value={this.props.domains}
                name="domains"
                onChange={this.props.handleChange}
                multiLine={true}
                rows={2}
                rowsMax={6}
              />
            </Col>
            <Col xsOffset={6} xs={6} md={6} sm={6}>
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