import React from 'react'
import { 
	Divider, 
	Card,
	CardHeader,
	CardText,
	Checkbox
} from 'material-ui'

export default ({tasks}) => (
	<Card>
		<CardHeader
	      	title="Tareas"
	      	//subtitle={email}
	      	actAsExpander={true}
	      	showExpandableButton={true}
	    />
	    <CardText expandable style={{padding: "1rem"}}>
	    	{
	    		tasks.map( ({text, done}, i) => (
	    			<Checkbox 
	    				key={i}
	    				label={text}
	    				checked={done}
	    			/>
	    		))	
	    	}
	    </CardText>
	</Card>
)