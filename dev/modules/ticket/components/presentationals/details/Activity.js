import React from 'react'

import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardText, 
	Avatar,
	FontIcon 
} from 'material-ui'
import Face from 'material-ui/svg-icons/action/face'
import Computer from 'material-ui/svg-icons/hardware/computer'

import TimeAgo, { getFullTime } from '../../../../../common/components/TimeAgo'
import ActionsList from '../../../../../common/components/ActionsList'

const styles = {
	greyDate : {
		color: "rgba(33, 33, 33, 0.54)",
		display: "block",
		fontSize:14
	}
}

const FirstActivity = ({ticket}) => {
	return(
		<Card style={{margin: "0.6rem"}}>
			<CardHeader
				title={`${ticket.title} #${ticket.number}`}
				subtitle={
					<span style={styles.greyDate}>
						<TimeAgo date={ticket.time} /> - {getFullTime(ticket.time)}
					</span>
				}

				avatar={<Avatar src={`/images/sources/${ticket.source}.png`} />}
			/>
			<CardText>
				{ticket.description}
			</CardText>
		</Card>
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
			autor_icon: autor.face_base64 || <Face/>
		});
	}
	return (
		<Card style={{margin: "0.6rem"}}>
			<CardHeader
				title={autor_name}
				subtitle={<TimeAgo date={time} style={styles.greyDate} />}
				avatar={autor_icon}
			/>
			<ActionsList actions={actions} />
		</Card>			
	)
}