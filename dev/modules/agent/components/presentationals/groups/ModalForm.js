import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

import Form from './Form'

import { withApollo } from 'react-apollo'

import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import GetAgents from '../../../graphql/querys/agents.graphql'
import GetGroup from '../../../graphql/querys/group.graphql'
import GetGroups from '../../../graphql/querys/groups.graphql'

const initialState = {
	name: "",
	about: "",
	group_scale: null,
	agents: [],
	notification_hours: "",
	notification_agent: null,
	editorState: EditorState.createEmpty()
};

@withApollo
class ModalForm extends Component {
	
	state = initialState;
	
	componentWillReceiveProps = async (nextProps) => {
		//cuando el modal de edicion se presenta en pantalla
		if(nextProps.id && (!this.props.open && nextProps.open)){ //si es el formulario en edicion
			let group = await nextProps.client.query({
				query: GetGroup,
				fetchPolicy: 'network-only',
				variables: {id: nextProps.id}
			}).then(({ data }) => {
				let {__typename, ...group} = data.group;
				console.log("El grupo---", group)
				return group;
			});
			
			const blocksFromHTML = convertFromHTML(group.notification_text);
			
			const state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap
			);
			
			this.setState({
				...group,
				editorState: EditorState.createWithContent(state)
			});
		}
	};
	
	cleanForm = () => this.setState(initialState);
	
	send = event => {
		event.preventDefault();
		
		let {agents, group_scale, notification_agent, editorState, ...group} = this.state;
		// Mapeando grupo con atributos que espera el server
		if (agents.length) group.agents_id = agents.map(agent => agent.id);
		if (group_scale) group.group_scale_id = group_scale.id;
		if (notification_agent) {
			group.notification_agent_id = notification_agent.id;
			group.notification_text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		}
		
		/*if(!this.props.id) console.log("creando group", group);
		else console.log("actualizando group", group);*/
		
		this.props.close();
		this.props.submit({...group, id: this.props.id})
			.then(() => {
				if(this.props.id) this.props.notificate("Grupo actualizado con éxito!");
				else this.props.notificate("Grupo guardado con éxito!");
				this.setState(initialState);
			})
	};
	
	searchAgents = (search_text) => {
		return (
			this.props.client.query({
				query: GetAgents,
				variables: {search_text}
			})
				.then( ({data: {agents}}) => ({options: agents.nodes}) )
		)
	};
	
	searchGroups = (search_text) => {
		return (
			this.props.client.query({
				query: GetGroups,
				variables: {search_text}
			})
				.then( ({data: {groups}}) => ({options: groups.nodes}) )
		)
	};
	
	handleChange = e => this.setState({[e.target.name]: e.target.value});
	
	handleReactSelectChange = (name) => (selectValue) => this.setState({[name] : selectValue});
	
	handleEditorChange = (editorState) => {
		this.setState({
			editorState
		});
	};
	
	render = () => (
    <div>
      <Dialog
        title={this.props.title}
        titleClassName={'center-align'}
        open={this.props.open}
        onRequestClose={this.props.close}
        autoScrollBodyContent={true}
        contentStyle={{width: '50%'}}
      >
        <Form {...this.state}
              id={this.props.id}
              close={this.props.close}
              handleChange={this.handleChange}
              handleReactSelectChange={this.handleReactSelectChange}
              handleEditorChange={this.handleEditorChange}
              clean={this.cleanForm}
              send={this.send}
              searchAgents={this.searchAgents}
              searchGroups={this.searchGroups}
        />
      </Dialog>
    </div>
	)
}

export default ModalForm