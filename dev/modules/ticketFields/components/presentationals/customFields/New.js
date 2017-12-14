import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { IconButton, Subheader } from 'material-ui'
import FieldTypeIcon from './FieldIcon'

const styles = {
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 10,
    },
};

export default () => (
	<Row center="xs">
		<Subheader>Nuevo Campo del Ticket</Subheader>
		<Col xs={6}>
			<IconButton 
				iconStyle={styles.largeIcon}
				style={styles.large}
				tooltip="Campo de texto"
			>
				<FieldTypeIcon type="TEXT" />
			</IconButton>
		</Col>
		<Col xs={6}>
			<IconButton 
				iconStyle={styles.largeIcon}
				style={styles.large}
				tooltip="Area de texto"
			>
				<FieldTypeIcon type="TEXTAREA"/>
			</IconButton>
		</Col>
		<Col xs={6}>
			<IconButton 
				iconStyle={styles.largeIcon}
				style={styles.large}
				tooltip="Campo numerico"
			>
				<FieldTypeIcon type="NUMBER"/>
			</IconButton>
		</Col>
		<Col xs={6}>
			<IconButton 
				iconStyle={styles.largeIcon}
				style={styles.large}
				tooltip="Campo de checkeo"
			>
				<FieldTypeIcon type="CHECKBOX"/>
			</IconButton>
		</Col>
		<Col xs={6}>
			<IconButton 
				iconStyle={styles.largeIcon}
				style={styles.large}
				tooltip="Campo de seleccion"
			>
				<FieldTypeIcon type="SELECT"/>
			</IconButton>
		</Col>
		<Col xs={6}>
			<IconButton 
				iconStyle={styles.largeIcon}
				style={styles.large}
				tooltip="Campo de fecha"
			>
				<FieldTypeIcon type="DATE"/>
			</IconButton>
		</Col>
	</Row>
)