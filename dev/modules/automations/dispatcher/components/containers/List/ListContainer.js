import React, { Component } from 'react'
// Presentationals Components
import PanelPolicies from '../../presentationals/List/PanelList'

class Panel extends Component {
	
	deleteDispatcher = (id) => (e) => {
		this.props.deleteDispatcher(id)
			.then(({data: {deleteDispatcher: {name}}}) => {
				this.props.openAlert(`Despachador ${name} eliminado con éxito`);
			})
	};
	
	render = () => (
		<PanelPolicies
			{...this.props}
			deleteDispatcher={this.deleteDispatcher}
		/>
	)
}

export default Panel;