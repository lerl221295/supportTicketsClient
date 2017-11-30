import React from 'react';
import Paper from 'material-ui/Paper';
import {white, grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import {Col, Row} from "react-flexbox-grid";

const IndicatorBox = ({color, title, value, icon: Icon}) => {
	
	const styles = {
		iconFrameColor: {
			backgroundColor: color
		},
		text: {
			fontWeight: typography.fontWeightLight,
			color: grey800
		},
		number: {
			fontWeight: typography.fontWeightMedium,
			color: grey800
		},
		colLessPadding: {
			padding: '0'
		},
		rowMorePadding: {
			paddingLeft: '0.5rem'
		},
		iconWidth: {
			width: '100%'
		}
	};
	
	return (
		<Paper>
			<Row middle={"xs"} center={"xs"} className={"box-height"} style={styles.rowMorePadding}>
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
					<h3 className={"indicator-text"} style={styles.text}>{title}</h3>
					<h2 className={"indicator-number"} style={styles.number}>{value}</h2>
				</Col>
			</Row>
		</Paper>
	);
};

export default IndicatorBox;
