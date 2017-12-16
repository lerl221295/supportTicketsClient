import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import Form from '../presentationals/groups/Form'

import GetAgents from '../../graphql/querys/agents.graphql'
import GetGroup from '../../graphql/querys/group.graphql'
import GetGroups from '../../graphql/querys/groups.graphql'

import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

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
class FormContainer extends Component {
    
    state = initialState;
    
    componentWillMount = async () => {
        if(this.props.id){ //si es el formulario en edicion
            let group = await this.props.client.query({
                query: GetGroup,
                fetchPolicy: 'network-only',
                variables: {id: this.props.id}
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
    
    cleanAndBack = () => {
        this.setState(initialState);
        this.props.goBack();
    };

    cancel = event => {
        event.preventDefault();
        this.cleanAndBack();
    };
    
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
        
        this.props.submit({...group, id: this.props.id})
            .then(() => {
                if(this.props.id) this.props.openAlert("Grupo actualizado con éxito!");
                else this.props.openAlert("Grupo guardado con éxito!");
                this.cleanAndBack();
            })
    };

    searchEntity = (Query, entity) => (search_text) => (
        this.props.client.query({
            query: Query,
            variables: {search_text}
        })
        .then( ({data}) => ({options: data[entity].nodes}))
    );
    
    handleChange = e => this.setState({[e.target.name]: e.target.value});
    
    handleReactSelectChange = (name) => (selectValue) => this.setState({[name] : selectValue});
    
    handleEditorChange = (editorState) => {
        this.setState({
            editorState
        });
    };
    
    render = () => (
        <Form 
            {...this.state}
            handleChange={this.handleChange}
            handleReactSelectChange={this.handleReactSelectChange}
            handleEditorChange={this.handleEditorChange}
            searchAgents={this.searchEntity(GetAgents, 'agents')}
            searchGroups={this.searchEntity(GetGroups, 'groups')}
            cancel={this.cancel}
            send={this.send}
        />
    )
}

export default FormContainer