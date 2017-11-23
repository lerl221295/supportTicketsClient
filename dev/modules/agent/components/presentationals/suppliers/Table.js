import React, { Component } from 'react'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'material-ui/Table'
import Pagination from 'material-ui-pagination'
import LinearProgress from 'material-ui/LinearProgress'
import Plus from 'material-ui/svg-icons/content/create'
import Avatar from 'material-ui/Avatar'
import FormEdit from '../../containers/EditSupplier'
import tableStyles from '../../../../../styles/javascript/tables'

class SupplierTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
			id_edit: 0
		}
	}
	
	edit = id => event =>  this.setState({id_edit: id, modalOpen : true});
	
	closeModal = event => this.setState({ modalOpen : false });
	
	componentWillReceiveProps = (nextProps) => {
		if(nextProps.search !== "") this.setState({current: 1});
	};
	
	render = () => {
		let loading = do {
			if (this.props.data.loading) { <LinearProgress mode="indeterminate" /> }
		};
		
		// let tecnicos = filter(this.camposFiltrar, this.props.data.tecnicos, this.props.search);
		let {suppliers, total} = do {
			if(this.props.data.suppliers) ({
				suppliers: this.props.data.suppliers.nodes,
				total: this.props.data.suppliers.count
			});
			else ({suppliers: [], total: 1});
		};
		
		let pags = Math.ceil(total/this.props.limit);
		
		return (
			<div>
				{loading}
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false} striped={true}>
						<TableRow>
							<TableHeaderColumn style={tableStyles.center}>Nombre</TableHeaderColumn>
							<TableHeaderColumn style={{...tableStyles.center, ...tableStyles.edit}}>Edit</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							suppliers.map((supplier, i) => (
								<TableRow key={i}>
									<TableRowColumn style={tableStyles.center}>{supplier.name}</TableRowColumn>
									<TableRowColumn style={{...tableStyles.center, ...tableStyles.edit}}>
										<Plus onClick={this.edit(supplier.id)}
										      style={tableStyles.edit}
										      hoverColor="blue"/>
									</TableRowColumn>
								</TableRow>
							))
						}
					
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableRowColumn colSpan="3" style={tableStyles.center}>
								<Pagination
									total = { pags }
									current = { this.props.current }
									display = { 5 }
									onChange = { number => this.props.changePag(number) }
								/>
							</TableRowColumn>
						</TableRow>
					</TableFooter>
				</Table>
				<FormEdit
					title = "Actualizar datos del proveedor"
					open = {this.state.modalOpen}
					close = {this.closeModal}
					id = {this.state.id_edit}
					notificate = {this.props.notificate}
					limit = {this.props.limit}
				/>
			</div>
		)
	}
}

export default SupplierTable;