import React from 'react'
import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardText, 
	Avatar 
} from 'material-ui'
import Face from 'material-ui/svg-icons/action/face'

import { TimeAgo } from '../../../../../common/components'

const styles = {
	greyDate : {
		color: "rgba(33, 33, 33, 0.54)",
		display: "block",
		fontSize:14
	}
}

export default ({ autor, time, text }) => {
	
	return (
		<Card style={{margin: "0.6rem"}}>
			<CardHeader
				title={autor.name}
				subtitle={<TimeAgo date={time} style={styles.greyDate} />}
				avatar={autor.face_base64 || (<Avatar icon={<Face/>} />)}
			/>
			<CardText dangerouslySetInnerHTML={{__html: text}}/>
		</Card>
	)
}