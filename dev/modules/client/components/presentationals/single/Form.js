import React, { Component } from 'react'
import {TextField, Paper, IconButton, Subheader, FlatButton, FloatingActionButton, Toggle, Checkbox} from 'material-ui'
import { Grid, Row, Col } from 'react-flexbox-grid'
import {
	ActionAccountCircle as Person,
	CommunicationBusiness as Organization,
	ActionHome as Home,
	ActionDescription as Description,
	CommunicationPhone as Phone,
	CommunicationContactMail as Email
} from "material-ui/svg-icons";
import {
	InputWithIcon, ReactSelectWithIcon, AvatarImg, FormButtonGroup, FormSubheader
} from '../../../../../common/components'

const styles = {
	mediumIcon: {
		width: 48,
		height: 48,
	}
};

class Form extends Component {
	
	state = {
		edit: true
	};
	
	static defaultProps = {
		name: "",
		lastname: "",
		phones: "",
		email: "",
		face_base64: null,
		address: "",
		organization_id: null
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
			<Paper>
				<Row>
					<Col xs>
						<FormSubheader
							id={this.props.id} edit={this.state.edit}
							back={this.props.cancel} onCheckHandler={this.onCheckHandler}>
							Cliente
						</FormSubheader>
					</Col>
        </Row>
				<form className="padding">
					<Row>
						<Col xs={12} sm={12} md={6} lg={6}>
							<AvatarImg
								face_base64={this.props.face_base64}
								avatar_filename={this.props.avatar_filename}
								changeImage={this.props.changeImage}
								disabled={!this.state.edit}
							/>
							<InputWithIcon
								Icon={Person}
								Input={TextField}
								hintText="Escriba el nombre"
								floatingLabelText="Nombre"
								name="name"
								onChange={this.props.handleChange}
								value={this.props.name}
								disabled={!this.state.edit}
							/>
							<InputWithIcon
								Icon={Person}
								Input={TextField}
								hintText="Escriba el apellido"
								floatingLabelText="Apellido"
								value={this.props.lastname}
								disabled={!this.state.edit}
								name="lastname"
								onChange={this.props.handleChange}
							/>
							<InputWithIcon
								Icon={Email}
								Input={TextField}
								hintText="Escriba el email"
								floatingLabelText="Email"
								value={this.props.email}
								disabled={!this.state.edit}
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
								disabled={!this.state.edit}
								name="phones"
								onChange={this.props.handleChange}
							/>
							<InputWithIcon
								Icon={Home}
								Input={TextField}
								hintText="Escriba la ubicacion"
								floatingLabelText="Ubicacion"
								value={this.props.address}
								disabled={!this.state.edit}
								name="address"
								onChange={this.props.handleChange}
								multiLine={true}
								//rows={2}
								rowsMax={6}
							/>
							<InputWithIcon
								Icon={Description}
								Input={TextField}
								hintText="Acerca del cliente"
								floatingLabelText="Acerca de"
								value={this.props.about}
								disabled={!this.state.edit}
								name="about"
								onChange={this.props.handleChange}
								multiLine={true}
								//rows={2}
								rowsMax={6}
							/>
							<ReactSelectWithIcon
								Icon={Organization}
								label={"Organizacion"}
								value={this.props.organization}
								disabled={!this.state.edit}
								onChange={this.props.handleReactSelectChange("organization")}
								valueKey="id" labelKey="name"
								loadOptions={this.props.searchOrganizations}
								backspaceRemoves={true}
								placeholder="Seleccione la organizacion"
								autoload={false}
								filterOption={() => (true)}
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
			</Paper>
		)
	}
}


export default Form