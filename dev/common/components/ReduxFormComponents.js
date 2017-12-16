import React, { Component } from 'react'
import {
	SelectField,
	MenuItem,
} from 'material-ui'
import InputWithIcon from './InputWithIcon'
import ReactSelectWithIcon from './ReactSelectWithIcon'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg';

export const renderSelectField = (
	{
		input,
		label,
		children,
		meta,
		options,
		value,
		...custom
	}) => (
	<InputWithIcon
		Input={SelectField}
		{...input}
		onChange={(event, index, value) => input.onChange(value)}
		floatingLabelText={label}
		{...custom}
	>
		{
			options.map(({value, text}, i) => (
				<MenuItem
					key={i}
					primaryText={text}
					value={value}
					checked={input.value.includes(value)}
				/>
			))
		}
	</InputWithIcon>
);

export const renderSelectReactField = (
	{
		input,
		label,
		...custom
	}) => (
	<ReactSelectWithIcon
		label={label}
		{...input}
		//onChange={(value) => input.onChange(value)}
		onBlur={(e) => {
			//e.preventDefault();
			input.onBlur(input.value);
		}}
		valueKey="id" labelKey="name"
		backspaceRemoves={true}
		autoload={false}
		filterOption={() => (true)}
		//value={input.value}
		{...custom}
	/>
);

export class EditorWrapper extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty()
		}
	}
	
	componentWillMount = () => {
		const blocksFromHTML = convertFromHTML(this.props.input.value);
		const state = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap
		);
		this.setState({
			editorState: EditorState.createWithContent(state)
		});
	};
	
	convertToString = (editorState) => draftToHtml(convertToRaw(editorState.getCurrentContent()));
	
	handleEditorStateChange = (editorState) => {
		const { onChange } = this.props.input;
		const stringValue = this.convertToString(editorState);
		
		this.setState({ editorState });
		onChange(stringValue);
	};
	
	render = () => (
		<Editor
			editorState={this.state.editorState}
			onEditorStateChange={this.handleEditorStateChange}
			toolbar={this.props.toolbar}
			editorClassName={this.props.editorClassName}
			mention={this.props.mention}
		/>
	)
}