import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, FlatButton, ToolbarSeparator, Dialog } from 'material-ui'
import CustomFieldsList from './List'
import NewCustomFields from './New'
import SelectForm from './SelectFieldForm'
import NormalForm from './NormalFieldForm'

const getTitle = type => do {
	if(type === "SELECT") "Nuevo campo Seleccionable";
	else if(type === "TEXT") "Nuevo campo de Texto";
	else if(type === "TEXTAREA") "Nuevo campo Texto Multi-linea";
	else if(type === "DATE") "Nuevo campo de Fecha";
	else if(type === "CHECKBOX") "Nuevo campo de CheckBox";
	else if(type === "NUMBER") "Nuevo campo Numerico";
}

class CustomFields extends Component {
	render = () => {
		const {
			custom_fields,
			modals,
			closeModal,
			deleteField,
			update,
			onDragEnd,
			getItemStyle
		} = this.props;

		return(
			<Paper style={{padding: "2rem"}}>
				<Row middle="xs">
					<Col xs={7}>
						<CustomFieldsList 
							custom_fields={custom_fields} 
							deleteField={deleteField}
							onDragEnd={onDragEnd}
							getItemStyle={getItemStyle}
						/>
					</Col>
					<Col xs={1}>
						<ToolbarSeparator style={{height: '60vh'}}/>
					</Col>
					<Col xs={4}>
						<NewCustomFields/>
					</Col>
				</Row>
			    <FlatButton
			    	label="Guardar"
			    	fullWidth
			    	onClick={update}
			    	primary
			    />
			    <Dialog
			        title={getTitle(modals["selectField"].type)}
			        open={modals["selectField"].open}
			        onRequestClose={() => closeModal("SELECT")}
			        autoScrollBodyContent={true}
			        contentStyle={{ width: '80%'}}
			    >
			    	<SelectForm initialValues={{ type: modals["selectField"].type }} />
			    </Dialog>
			    <Dialog
			        title={getTitle(modals["normalFields"].type)}
			        open={modals["normalFields"].open}
			        onRequestClose={() => closeModal(modals["normalFields"].type)}
			        autoScrollBodyContent={true}
			        contentStyle={{ width: '25%'}}
			    >
			    	<NormalForm initialValues={{ type: modals["normalFields"].type }} />
			    </Dialog>
			</Paper>
		)
	}
}

export default CustomFields 