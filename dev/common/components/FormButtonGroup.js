import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import {FlatButton} from "material-ui";

const FormButtonGroup = ({cancel, send}) => (
	<Col className={'button-group'} xs={12}>
		<Row center={"xs"}>
			<Col xs={3}>
				<FlatButton
					label="Cancelar"
					primary={true}
					onClick={cancel}
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