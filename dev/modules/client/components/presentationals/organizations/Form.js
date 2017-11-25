import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Domain from 'material-ui/svg-icons/social/location-city'
import Home from 'material-ui/svg-icons/action/home'
import Description from 'material-ui/svg-icons/action/description'
import Email from 'material-ui/svg-icons/communication/contact-mail'

import { InputWithIcon, FormButtonGroup } from '../../../../../common/components'

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