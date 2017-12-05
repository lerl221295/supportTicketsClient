import React from 'react'
import { 
	Paper,
	Card, 
	CardHeader, 
	CardTitle, 
	CardText, 
	Avatar 
} from 'material-ui'
import Face from 'material-ui/svg-icons/action/face'
import { lightBlue50, lightGreen50, blueGrey800 } from 'material-ui/styles/colors'
import { Grid, Row, Col } from 'react-flexbox-grid'

import TimeAgo, { getFullTime } from '../../../../../common/components/TimeAgo'

const styles = {
	greyDate : {
		color: blueGrey800,
		display: "block",
		fontSize:12,
		fontWeight: "bold"
	},
	header: (agent) => ({
		backgroundColor: do {
			if(agent) lightGreen50;
			else lightBlue50;
		},
	 	margin:"-1rem",
	 	marginBottom: "0",
	  	padding: "1rem"
	})
}

const renderAvatar = ({face_base64}) => {
	if(!face_base64) return  <Avatar icon={<Face/>} />;
	return <Avatar src={face_base64} />;
}

export default ({ autor, time, text, type_autor }) => {
	
	return (
		
		<Paper style={{margin: "0.6rem", padding: "1rem"}}>
			<Row between="xs" style={styles.header(type_autor === "AGENT")}>
				<Col xs={3} md={3} sm={3}>
					<Row middle="xs">
						<Col xs={3} md={3} sm={3}>
							{renderAvatar(autor)} 
						</Col>
						<Col xs={9} md={9} sm={9}>
							{autor.name}
							<TimeAgo style={{...styles.greyDate, textAlign: "left"}} date={time}/>
						</Col>
					</Row>
				</Col>
				<Col xs={9} md={9} sm={9} style={{...styles.greyDate, textAlign: "right"}}>
					<span>{getFullTime(time)}</span>
				</Col>
			</Row>
			<Row style={{padding: "1rem"}} dangerouslySetInnerHTML={{__html: text}}/>
		</Paper>
	)
}