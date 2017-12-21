import React from 'react';
import Paper from 'material-ui/Paper';
import {white, grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import {Col, Row} from "react-flexbox-grid";

const IndicatorBox = ({goToTickets, color, title, value, icon: Icon}) => {
	
	const styles = {
		paper: {cursor: "pointer"},
		iconFrameColor: {
			backgroundColor: color
		},
		text: {
			fontWeight: typography.fontWeightLight,
			color: grey800,
			fontSize: '1.3rem',
			marginBottom: '0.5rem'
		},
		number: {
			fontWeight: typography.fontWeightMedium,
			color: grey800,
			fontSize: '2rem'
		},
		box: {
			height: '5rem',
			paddingLeft: '0.5rem'
		},
		colLessPadding: {
			padding: '0'
		},
		iconWidth: {
			width: '100%'
		}
	};
	
	return (
		<Paper style={styles.paper} onClick={goToTickets}>
			<Row middle={"xs"} center={"xs"} style={styles.box}>
				<Col xs={2} className={"center-align max-height"} style={styles.iconFrameColor}>
					<Row middle={"xs"} center={"xs"} className={"max-height"}>
						<Col xs={12} style={styles.colLessPadding}>
							<Icon
								color={white}
								style={styles.iconWidth}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={10}>
					<h3 style={styles.text}>{title}</h3>
					<h2 style={styles.number}>{value}</h2>
				</Col>
			</Row>
		</Paper>
	);
};

export default IndicatorBox;
