import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import { IconButton, Subheader } from 'material-ui'
import FieldTypeIcon from './FieldIcon'
import { openModal } from '../../../actions/customFields'
import Theme from '../../../../../theme-default'

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

const getTooltip = type => do {
	if(type === "SELECT") "Seleccionable";
	else if(type === "TEXT") "Texto";
	else if(type === "TEXTAREA") "Texto Multi-linea";
	else if(type === "DATE") "Fecha";
	else if(type === "CHECKBOX") "CheckBox";
	else if(type === "NUMBER") "Numerico";
}

const NewField = ({openModal}) => {
	const TYPES = ["TEXT", "TEXTAREA", "NUMBER", "DATE", "CHECKBOX", "SELECT"];
	return(
		<Row center="xs">
			<Subheader>Nuevo Campo del Ticket</Subheader>
			{
				TYPES.map(type => (
					<Col xs={6} key={type}>
						<IconButton 
							iconStyle={styles.largeIcon}
							style={styles.large}
							tooltip={getTooltip(type)}
							onClick={ e => openModal(type)}
						>
							<FieldTypeIcon type={type} hoverColor={Theme.palette.accent1Color}/>
						</IconButton>
					</Col>
				))
			}
		</Row>	
	)
}

export default connect(null, { openModal })(NewField)