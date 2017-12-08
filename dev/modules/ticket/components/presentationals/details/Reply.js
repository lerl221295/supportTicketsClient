import React from 'react'
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


export default ({client, reply}) => (
	<Card style={{margin: "0.6rem"}}>
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
						'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history']
				}}
				editorClassName="rich-editor"
				mention={{
					separator: ' ',
      				trigger: '@',
      				suggestions: TicketProperties
				}}
		   	/>
			<Row end="xs">
				<FlatButton label="Responder" onClick={() => console.log(reply)} />
			</Row>
	    </CardText>
	</Card>
)