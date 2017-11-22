import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import {FlatButton} from "material-ui";

const FormButtonGroup = ({stylesForm, close, clean, send}) => (
	<Col style={stylesForm.buttonGroup} xs={12}>
		<Row center={"xs"}>
			<Col xs={3}>
				<FlatButton
					label="Cancelar"
					primary={true}
					onClick={()=> { close(); clean()} }
				/>
			</Col>
			<Col xs={3}>
				<FlatButton
					label="Guardar"
					primary={true}
					onClick={send}
				/>
			</Col>
		</Row>
	</Col>
);

export default FormButtonGroup