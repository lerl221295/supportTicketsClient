import React, { Component } from 'react'
import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardText,
	FlatButton,
	Divider
} from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import { Field } from 'redux-form'
import { EditorWrapper as Editor } from '../../../../../common/components/ReduxFormComponents'

const TicketProperties = [
	{text: "Nombre del grupo", value: "Grupo tal", val: "113"}
]

class Reply extends Component {
	state = { expanded: false }
	handleExpandChange = (expanded) => this.setState({expanded: expanded});
	
	componentDidUpdate = (_, prevState) => {
		if(!prevState.expanded && this.state.expanded) 
			window.scrollTo(0,document.body.scrollHeight);
	}

	render = () => {
		const {
			client,
		 	reply,
		 	generateSource,
		 	sendIntervention,
		 	ticket_number,
		 	reset
		} = this.props;

		return(
			<Card 
				style={{margin: "0.6rem"}} 
				expanded={this.state.expanded}
				onExpandChange={this.handleExpandChange}
			>
				<CardHeader
			      	title={`Responder a ${client.email}`}
			      	actAsExpander={true}
			      	showExpandableButton={true}
			    />
			    <CardText expandable>
				    <Field 
				    	name="body"
				    	component={Editor}
				    	toolbar={{
							options: [
								'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'
							],
							image: {
								uploadEnabled: true,
								defaultSize:{ height: 400, width: 400 },
								uploadCallback: generateSource
							}
						}}
						editorClassName="rich-editor"
						mention={{
							separator: ' ',
		      				trigger: '@',
		      				suggestions: TicketProperties
						}}
				   	/>
					<Row end="xs">
						<FlatButton label="Responder" onClick={
							() => {
								sendIntervention({ticket_number, text: reply.body});
								this.handleExpandChange(false);
							}
						} />
					</Row>
			    </CardText>
			</Card>
		)
	}
}

export default Reply