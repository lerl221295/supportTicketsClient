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
import theme from '../../../../../theme-default'
import Pagination from 'material-ui-pagination'
import LinearProgress from 'material-ui/LinearProgress'
import { ImageRemoveRedEye as Eye } from 'material-ui/svg-icons'

class SupplierTable extends Component {
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
							<TableHeaderColumn className="center fullname">Nombre</TableHeaderColumn>
							<TableHeaderColumn className="center">Acerca de</TableHeaderColumn>
							<TableHeaderColumn className="center edit">Detalle</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							suppliers.map((supplier, i) => (
								<TableRow key={i}>
									<TableRowColumn className="center fullname">{supplier.name}</TableRowColumn>
									<TableRowColumn>{supplier.about}</TableRowColumn>
									<TableRowColumn className="center edit">
										<Eye onClick={this.props.edit(supplier.id)}
										      className="edit"
										      hoverColor={theme.palette.accent1Color}
										/>
									</TableRowColumn>
								</TableRow>
							))
						}
					
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableRowColumn colSpan="3" className="center">
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
			</div>
		)
	}
}

export default SupplierTable;