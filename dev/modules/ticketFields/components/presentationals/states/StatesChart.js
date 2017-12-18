import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Subheader } from 'material-ui'
import smcat from 'state-machine-cat'

const ReduxContainer = connect(({ticketFields: {states} }) => ({states}));

@ReduxContainer
class Status extends Component {
	state = { diagram: "" }

	mapStates = states => {
		console.log(states);
		let template = ``
		for(let state of states){
			if(state.came_from && state.came_from.length)
				for(let came_from of state.came_from){
					template += `"${came_from.label}" => "${state.label}"; \n`
				}
		}
		return template;
	}

	renderDiagram = states => {
		const template = this.mapStates(states)
		smcat.render(template,
		    {
		        outputType: "svg",
		        direction: "top-down"
		    },
		    (pError, pSuccess) => {
		    	if(pError) console.log(pError);
		    	else this.setState({diagram: pSuccess});
		    }
		)
	}

	componentDidMount = () => this.renderDiagram(this.props.states)
	componentWillReceiveProps = nextProps => this.renderDiagram(nextProps.states)

	render = () => (
		<div>
			<Subheader>Ciclo de vida del Ticket</Subheader>
			<div dangerouslySetInnerHTML={{__html: this.state.diagram}}/>
		</div>
	);
}

export default Status;