import React, { Component } from 'react'

class TicketList extends Component {
	static defaultProps = {
		filter_form: {
			firstName: "",
			lastName: ""
		}
	}

	render = () => {
		console.log(this.props.filter_form);
		const { firstName, lastName } = this.props.filter_form;
		return(<h1>hola {`${firstName || ''} ${lastName || ''}`}</h1>)
	}
}

export default TicketList