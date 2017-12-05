import React from 'react'

import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardText, 
	Avatar,
	FontIcon,
	Paper
} from 'material-ui'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { grey100, blueGrey800 } from 'material-ui/styles/colors'

import Face from 'material-ui/svg-icons/action/face'
import Computer from 'material-ui/svg-icons/hardware/computer'

import TimeAgo, { getFullTime } from '../../../../../common/components/TimeAgo'
import ActionsList from '../../../../../common/components/ActionsList'

const styles = {
	greyDate : {
		color: "rgba(33, 33, 33, 0.54)",
		display: "block",
		fontSize:12,
		fontWeight: "bold"
	},
	header: {
		backgroundColor: grey100,
	 	margin:"-1rem",
	 	marginBottom: "0",
	  	padding: "1rem"
	},
	title: {
		color: blueGrey800,
		display: "block",
		fontSize:17,
		fontWeight: "bold"
	}
}

const FirstActivity = ({ticket}) => {
	return(
		<Paper style={{margin: "0.6rem", padding: "1rem"}}>
			<Row style={styles.header}>
				<Col xs={12} md={12} sm={12}>
					<Row middle="xs">
						<Col xs={1} md={1} sm={1}>
							<Avatar src={`/images/sources/${ticket.source}.png`} />
						</Col>
						<Col xs={11} md={11} sm={11}>
							<Row style={styles.title}>
								{`${ticket.title} - ${ticket.number}`}
							</Row>
							<Row style={styles.greyDate}>
								Reportado: <TimeAgo date={ticket.time} /> - {getFullTime(ticket.time)}
							</Row>
							<Row style={styles.greyDate}>
								Responder: <TimeAgo date={ticket.response_by} />
							</Row>
							<Row style={styles.greyDate}>
								Solucinar: <TimeAgo date={ticket.resolve_by} />
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row style={{padding: "1rem"}}>
				{ticket.description}
			</Row>
		</Paper>
	)
}

export default ({ticket, autor, time, actions, type, type_autor}) => {
	if(type === "CREATION") return <FirstActivity ticket={ticket}/>;
	let { autor_name, autor_icon } = do {
		if(type_autor === "SYSTEM") ({
			autor_name: "Sistema",
			autor_icon: <Computer/>
		});
		else ({
			autor_name: autor.name,
			autor_icon: do {
				if(autor.face_base64) (<Avatar src={autor.face_base64}/>);
				else (<Face/>);
			}
		});
	}
	return (
		<Paper style={{margin: "0.6rem", padding: "1rem"}}>
			<Row between="xs" style={styles.header}>
				<Col xs={3} md={3} sm={3}>
					<Row middle="xs">
						<Col xs={3} md={3} sm={3}>
							{autor_icon} 
						</Col>
						<Col xs={9} md={9} sm={9}>
							{autor_name}
							<TimeAgo style={{...styles.greyDate, textAlign: "left"}} date={time}/>
						</Col>
					</Row>
				</Col>
				<Col xs={9} md={9} sm={9} style={{...styles.greyDate, textAlign: "right"}}>
					<span>{getFullTime(time)}</span>
				</Col>
			</Row>
			<Row>
				<ActionsList actions={actions} />
			</Row>
		</Paper>		
	)
}