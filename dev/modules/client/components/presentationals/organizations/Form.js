import React, { Component } from 'react'
import { TextField, Paper } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import Domain from 'material-ui/svg-icons/social/location-city'
import Description from 'material-ui/svg-icons/action/description'
import Email from 'material-ui/svg-icons/communication/contact-mail'

import { InputWithIcon, FormButtonGroup, FormSubheader } from '../../../../../common/components'

class Form extends Component {
	
	state = {
		edit: true
	};
	
	static defaultProps = {
		name: "",
		about: "",
		domains: ""
	};
	
	componentWillReceiveProps = (nextProps) => {
		if (!this.props.id)
			this.state = {
				edit: do {
					if (nextProps.id) false;
					else true;
				}
			};
	};
	
	onCheckHandler = () => {
		this.setState({edit: !this.state.edit});
	};

	render = () => {
		return (
      <Row center="xs" middle="xs" style={{marginTop: '3rem'}}>
        <Col xs={5}>
	        <Paper>
		        <Row start="xs">
			        <Col xs={12}>
				        <FormSubheader
					        id={this.props.id} edit={this.state.edit}
					        back={this.props.cancel} onCheckHandler={this.onCheckHandler}>
					        Organización
				        </FormSubheader>
			        </Col>
			        <Col xs={12}>
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
								        disabled={!this.state.edit}
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
								        //rows={2}
								        rowsMax={6}
								        disabled={!this.state.edit}
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
								        //rows={2}
								        rowsMax={3}
								        disabled={!this.state.edit}
							        />
						        </Col>
						        {
							        do {
								        if (this.state.edit) (
									        <FormButtonGroup
										        cancel={this.props.cancel}
										        send={this.props.send}
									        />
								        )
								        else ""
							        }
						        }
					        </Row>
				        </form>
			        </Col>
		        </Row>
	        </Paper>
        </Col>
      </Row>
		)
	}
}


export default Form