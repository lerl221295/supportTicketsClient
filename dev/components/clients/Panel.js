import React, { Component } from 'react'
import Table from './Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ServiceFail from '../ServiceFail'
import FormCreate from '../../containers/CreateCliente'

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false
		}
	}

	openModal = event => this.setState({ modalOpen : true });

	closeModal = event => this.setState({ modalOpen : false });

	render = () => {
		if(this.props.data.error) return <ServiceFail />;
		return(
			<div>
				<Table data={this.props.data} search={this.props.search}/>
				<FloatingActionButton className="fab" onClick={this.openModal}> 
			    	<ContentAdd />
			    </FloatingActionButton>
			    <FormCreate 
			    	title="Crear un nuevo Cliente"
			    	open={this.state.modalOpen} 
			    	close={this.closeModal} />
			</div>
		)
	}
}

export default Panel