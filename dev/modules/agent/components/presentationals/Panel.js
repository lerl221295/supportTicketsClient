import React, { Component } from 'react'
import Table from './single/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ServiceFail from '../../../../common/components/ServiceFail'
import FormCreate from '../containers/CreateAgent'
import SearchBox from '../../../../common/components/SearchBox'
import Snackbar from 'material-ui/Snackbar';

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
			table_pag: 1,
			search_text: null, //ultimo text sercheado xd
			notificationOpen: false,
			notificationText: "hola"
		}
	}
	
	search = search_text => {
		this.setState({search_text, table_pag: 1});
		this.props.data.refetch({search_text, offset: null, limit: this.props.limit});
	};
	
	changePag = number => {
		this.setState({ table_pag: number });
		this.props.data.refetch({
			limit: this.props.limit,
			offset: (number-1)*this.props.limit,
			search_text: this.state.search_text
		})
	};
	
	notificate = text => {
		this.setState({
			notificationOpen: true,
			notificationText: text
		})
	};
	
	openModal = event => this.setState({ modalOpen : true });
	
	closeModal = event => this.setState({ modalOpen : false });
	
	render = () => {
		if(this.props.data.error) return <ServiceFail />;
		return(
			<div>
				<SearchBox search={this.search}/>
				<Table data={this.props.data} search={this.props.search}
				       limit={this.props.limit}
				       current={this.state.table_pag}
				       changePag={this.changePag}
				       notificate={this.notificate}
				/>
				<FloatingActionButton className="fab" onClick={this.openModal}>
					<ContentAdd />
				</FloatingActionButton>
				<FormCreate
					title="Crear un nuevo agente"
					open={this.state.modalOpen}
					close={this.closeModal}
					notificate={this.notificate}
				/>
				<Snackbar
					open={this.state.notificationOpen}
					message={this.state.notificationText}
					autoHideDuration={4000}
					onRequestClose={() => this.setState({notificationOpen: false})}
				/>
			</div>
		)
	}
}

export default Panel