import React from 'react'
import { 
	Divider, 
	Card,
	CardHeader,
	CardText,
	Checkbox,
	TextField
} from 'material-ui'
import { ActionNoteAdd } from 'material-ui/svg-icons'
import { InputWithIcon } from '../../../../../common/components'

export default ({tasks}) => (
	<Card>
		<CardHeader
	      	title="Tareas"
	      	//subtitle={email}
	      	actAsExpander={true}
	      	showExpandableButton={true}
	    />
	    <CardText expandable style={{padding: "1rem"}}>
	    	
		    	<InputWithIcon
					Icon={ActionNoteAdd}
					Input={TextField}
					style={{marginTop: "-2rem", marginBottom: "1rem"}}
					hintText="Agregar Tarea"
					floatingLabelText="Nueva Tarea"
					name="task"
					//value={this.props.name}
				/>
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