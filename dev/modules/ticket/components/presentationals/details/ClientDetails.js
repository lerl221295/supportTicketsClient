import React from 'react'
import { 
	Divider, 
	Card,
	CardHeader,
	CardText,
	Avatar
} from 'material-ui'
import Face from 'material-ui/svg-icons/action/face'

export default ({name, email, address, phones, face_base64, organization }) => (
	<Card>
		<CardHeader
	      	title={name}
	      	//subtitle={email}
	      	avatar={face_base64 || (<Avatar icon={<Face/>} />)}
	      	actAsExpander={true}
	      	showExpandableButton={true}
	    />
	    <CardText expandable style={{padding: "0 1rem 0 1rem"}}>
	    	<span>
	    		Email: {email}
	    	</span>
	    	<Divider />
	    	{
	    		do {
	    			if(organization)
	    				<span>
				    		Organizacion: {organization.name}
				    		<Divider />
				    	</span>
	    		}
	    	}
	    	<span>
	    		Direccion: {address || "Desconocida"}
	    	</span>
	    	<Divider />
	    	{
	    		do {
	    			if(phones.length)
	    				<span>
				    		Phones: <ul style={{margin: "0"}}>
				    			{
				    				phones.map(phone => <li key={phone}> {phone} </li>)
				    			}
				    		</ul>
				    	</span>
	    		}
	    	}
	    </CardText>
	</Card>
)