import React, { Component } from 'react'
import { TextField, Paper } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import Domain from 'material-ui/svg-icons/social/location-city'
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
      <Row center="xs" middle="xs">
        <Paper style={{width: "40%"}}>
          <form className="padding">
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