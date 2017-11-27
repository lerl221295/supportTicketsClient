import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {white, grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import {Col, Row} from "react-flexbox-grid";

const InfoBox = ({color, title, value, Icon}) => {
	
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
		}
	};
	
	return (
		<Row middle={"xs"} center={"xs"} className={"box-height"}>
			<Paper>
				<Col xs={2} className={"center-align max-height"} style={styles.iconFrameColor}>
					<Row middle={"xs"} center={"xs"} className={"max-height"}>
						<Col xs={12}>
							<Icon
								color={white}
								style={{ marginLeft: '-0.3rem'}}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={10}>
					<h3 className={"indicator-text"} style={styles.text}>{title}</h3>
					<h2 className={"indicator-number"} style={styles.number}>{value}</h2>
				</Col>
			</Paper>
		</Row>
	
	);
}

/*InfoBox.propTypes = {
	Icon: PropTypes.any, // eslint-disable-line
	color: PropTypes.string,
	title: PropTypes.string,
	value: PropTypes.string
};*/

export default InfoBox;
