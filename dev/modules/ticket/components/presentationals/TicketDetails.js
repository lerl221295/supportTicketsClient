import React, { Component } from 'react'

class TicketDetail extends Component {
	render = () => {
		if(this.props.data.loading) return(<h1> cargando </h1>);
		else return(<h1>{JSON.stringify(this.props.data.ticket)}</h1>)
	}
}

export default TicketDetail;