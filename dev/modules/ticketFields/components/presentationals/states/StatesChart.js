import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Subheader } from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'
import smcat from 'state-machine-cat'
import { Loading } from '../../../../../common/components'

const ReduxContainer = connect(({ticketFields: {states} }) => ({states: states.nodes}));

@ReduxContainer
class Status extends Component {
	state = { loading: false, diagram: "" }

	mapStates = states => {
		let template = `initial,\n`;
		for(let i = 0; i < states.length; i++){
			if(i === states.length-1) template += `"${states[i].label}";\n`;
			else template += `"${states[i].label}",\n`;
		}

		const new_state = states.find(state => state.key === "new");
		template += `initial => ${new_state.label}: Creacion del Ticket; \n`
		for(let state of states){
			if(state.came_from && state.came_from.length)
				for(let came_from of state.came_from){
					template += `"${came_from.label}" => "${state.label}"; \n`;
				}
			if(state.stage === "END") template += `"${state.label}" => final; \n`;
		}
		return template;
	}

	renderDiagram = states => {
		this.setState({loading: true});
		const template = this.mapStates(states);
		smcat.render(template,
		    {
		        outputType: "svg",
		        direction: "left-right"//top-down
		    },
		    (pError, pSuccess) => {
		    	if(pError) console.log(pError);
		    	else this.setState({diagram: pSuccess, loading: false});
		    }
		)
	}

	componentDidMount = () => this.renderDiagram(this.props.states)
	componentWillReceiveProps = nextProps => this.renderDiagram(nextProps.states)

	render = () => {
		if(this.state.loading) return <Loading/>;
		return(
			<Row center="xs">
				<Col xs={12} style={{overflowX: 'auto'}}>
					<Subheader>Ciclo de vida del Ticket</Subheader>
					<div dangerouslySetInnerHTML={{__html: this.state.diagram}}/>
				</Col>
			</Row>
		)
	};
}

export default Status;