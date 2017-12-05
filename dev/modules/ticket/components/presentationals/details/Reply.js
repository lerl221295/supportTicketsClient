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
import { Editor } from 'react-draft-wysiwyg';

export default ({client}) => (
	<Card style={{margin: "0.6rem"}}>
		<CardHeader
	      	title={`Responder a ${client.email}`}
	      	actAsExpander={true}
	      	showExpandableButton={true}
	    />
	    <CardText expandable>
		    <Editor
				toolbar={{
					options: [
						'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history']
				}}
				//editorState={this.props.editorState}
				editorClassName="rich-editor"
				//onEditorStateChange={this.props.handleEditorChange}
			/>
			<Row end="xs">
				<FlatButton label="Responder" onClick={() => alert("responder")} />
			</Row>
	    </CardText>
	</Card>
)