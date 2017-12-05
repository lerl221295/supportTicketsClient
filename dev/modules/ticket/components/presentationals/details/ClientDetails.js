import React from 'react'
import { 
	Divider, 
	Card,
	CardHeader,
	CardText,
	Avatar
} from 'material-ui'
import Face from 'material-ui/svg-icons/action/face'
import { grey800, blueGrey800 } from 'material-ui/styles/colors'

const styles = {
	key: {
		color: blueGrey800,
		fontSize:12
	},
	value: {
		color: blueGrey800,
		fontSize:12,
		fontWeight: 600
	}
}

export default ({name, email, address, phones, face_base64, organization }) => (
	<Card style={{marginTop: "0.6rem"}}>
		<CardHeader
	      	title={name}
	      	subtitle={
	      		do {
	      			if(organization) organization.name;
	      			else "Particular";
	      		}
	      	}
	      	avatar={face_base64 || (<Avatar icon={<Face/>} />)}
	      	actAsExpander={true}
	      	showExpandableButton={true}
	    />
	    <CardText expandable style={{padding: "0 1rem 0 1rem"}}>
	    	<span style={styles.key}> Email: </span> <span style={styles.value}> {email} </span>
	    	<Divider />
	    	<span style={styles.key}> Direccion: </span> <span style={styles.value}>{address || "Desconocida"} </span>
	    	<Divider />
	    	{
	    		do {
	    			if(phones.length)
	    				<div>
				    		<span style={styles.key}> Phones </span>: <ul style={{margin: "0"}}>
				    			{
				    				phones.map(phone => <li style={styles.value} key={phone}> {phone} </li>)
				    			}
				    		</ul>
				    	</div>
	    		}
	    	}
	    </CardText>
	</Card>
)