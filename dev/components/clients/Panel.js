import React, { Component } from 'react'
import Table from './Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ServiceFail from '../ServiceFail'
import FormCreate from '../../containers/CreateCliente'
import SearchBox from '../SearchBox'

class Panel extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
            table_pag: 1,
            search_text: null //ultimo text sercheado xd
		}
	}

    search = (search_text) => {
	    this.setState({search_text, table_pag: 1});
        this.props.data.refetch({search_text, offset: null, limit: this.props.limit});
    }

    changePag = (number) => {
        this.setState({ table_pag: number });
        this.props.data.refetch({
            limit: this.props.limit,
            offset: (number-1)*this.props.limit,
            search_text: this.state.search_text
        })
    }

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
                />
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