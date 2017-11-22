import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import DatePicker from 'material-ui/DatePicker'
import Divider from 'material-ui/Divider'
import Select from 'react-select';
import FlatButton from 'material-ui/FlatButton'
import { Row, Col } from 'react-flexbox-grid'
import Person from 'material-ui/svg-icons/action/account-circle'
import Image from 'material-ui/svg-icons/image/image'
import Home from 'material-ui/svg-icons/action/home'
import Description from 'material-ui/svg-icons/action/description'
import Wc from 'material-ui/svg-icons/notification/wc'
import Identy from 'material-ui/svg-icons/action/perm-identity'
import Phone from 'material-ui/svg-icons/communication/phone'
import Email from 'material-ui/svg-icons/communication/contact-mail'
import People from 'material-ui/svg-icons/social/people'

import InputWithIcon from '../../../../../common/components/InputWithIcon'
import ReactSelectWithIcon from '../../../../../common/components/ReactSelectWithIcon'


const styles = {
	img: {
		width: '7rem',
		borderRadius: 20
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
	/*static defaultProps = {
		name: "",
		lastname: "",
		role: "",
		sex: null,
		email: "",
		phones: "",
		about: "",
		profession: "",
		face_base64: null,
		group: "",
		supplier_id: null
	};*/
	
	render = () => {
		return (
      <form style={{padding: '1rem'}}>
        <Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
	            <Row>
		            <Col xs={12} sm={12} md={4} lg={4}>
			            {
				            do {
					            if(this.props.face_base64)
						            (<img src={this.props.face_base64} style={styles.img}/>);
					            else
						            (<img src="images/user.png" style={styles.img}/>)
				            }
			            }
		            </Col>
		            <Col xs={12} sm={12} md={8} lg={8}>
			            <TextField
				            id={"avatar_filename"}
				            disabled={true}
				            style={{width: 'fit-content', marginTop: '1rem'}}
				            value={this.props.avatar_filename}
				            multiLine={false}
				            rows={1}
			            /><br />
			            <RaisedButton
				            containerElement='label' // <-- Just add me!
				            label='Imagen de Perfil'
				            icon={<Image />}
			            >
				            <input accept="image/*" type="file" style={{ display: 'none' }} onChange={this.props.changeImage}/>
			            </RaisedButton>
		            </Col>
	            </Row>
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
            </Col>
            {/*COLUMNA DE LA DERECHA*/}
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
		            <MenuItem value={"AGENT"} primaryText="Agent" />
		            <MenuItem value={"SUPERVISOR"} primaryText="Supervisor" />
		            <MenuItem value={"ADMIN"} primaryText="Admin" />
	            </InputWithIcon>
	            <ReactSelectWithIcon
		            Icon={People}
		            Select={Select.Async}
		            label={"Proveedor"}
		            multi={false}
		            value={this.props.supplier}
		            onChange={this.props.handleReactSelectChange("supplier")}
		            valueKey="id" labelKey="name"
		            loadOptions={this.props.searchSuppliers}
		            backspaceRemoves={true}
		            placeholder="Seleccione un proveedor"
		            autoload={false}
		            filterOption={() => (true)}
	            />
	            {/*<ReactSelectWithIcon
		            Icon={People}
		            Select={Select.Async}
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
	            />*/}
            </Col>
            <Col style={{zIndex: 0, marginTop: '2rem'}} xsOffset={8} xs={4} md={4} sm={6}>
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