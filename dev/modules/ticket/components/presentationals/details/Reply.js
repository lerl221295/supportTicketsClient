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

export default (props) => {
	const {
		client,
	 	reply,
	 	generateSource,
	 	sendIntervention,
	 	ticket_number,
	 	reset
	} = props;

	return(
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
							/*falta reiniciar el campo de texto enriquecido*/
						}
					} />
				</Row>
		    </CardText>
		</Card>
	)
}