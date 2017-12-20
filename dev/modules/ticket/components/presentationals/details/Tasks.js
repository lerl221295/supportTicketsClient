import React, { Component } from 'react'
import { 
	Divider, 
	Card,
	CardHeader,
	CardText,
	Checkbox,
	TextField
} from 'material-ui'
import { ActionNoteAdd, ContentContentPaste as TasksIcon } from 'material-ui/svg-icons'
import { InputWithIcon } from '../../../../../common/components'

class Tasks extends Component {
	state = { newTask : "" };

	handleChange = (e) => this.setState({newTask: e.target.value});

	render = () => {
		const {tasks, addTask, checkTask} = this.props;
		return(
			<Card>
				<CardHeader
			      	title="Tareas"
			      	avatar={<TasksIcon/>}
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
							onKeyPress={e => {
								if (e.key === 'Enter'){
									addTask(this.state.newTask);
									this.setState({newTask: ""});
								}
							}}
							onChange={this.handleChange}
							value={this.state.newTask}
						/>
			    		{
				    		tasks.map( ({text, done}, i) => (
				    			<Checkbox 
				    				key={i}
				    				label={text}
				    				checked={done}
				    				onCheck={() => checkTask(text)}
				    			/>
				    		))	
				    	}
			    	
			    </CardText>
			</Card>
		)
	}
}

export default Tasks