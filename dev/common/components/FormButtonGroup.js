import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import {FlatButton, RaisedButton} from "material-ui";

const FormButtonGroup = ({cancel, send, disabled}) => (
	<Col className={'button-group'} xs={12}>
		<Row center={"xs"}>
			<Col xs={3}>
				<RaisedButton
					label="Cancelar"
					secondary={true}
					onClick={cancel}
				/>
			</Col>
			<Col xs={3}>
				<RaisedButton
					label="Guardar"
					primary={true}
					disabled={disabled}
					onClick={send}
				/>
			</Col>
		</Row>
	</Col>
);

export default FormButtonGroup