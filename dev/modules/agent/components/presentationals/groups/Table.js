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
import FormEdit from '../../containers/EditGroup'

class SupplierTable extends Component {
	render = () => {
		let loading = do {
			if (this.props.data.loading) { <LinearProgress mode="indeterminate" /> }
		};
		
		// let tecnicos = filter(this.camposFiltrar, this.props.data.tecnicos, this.props.search);
		let {groups, total} = do {
			if(this.props.data.groups) ({
				groups: this.props.data.groups.nodes,
				total: this.props.data.groups.count
			});
			else ({groups: [], total: 1});
		};
		let pags = Math.ceil(total/this.props.limit);
		
		return (
			<div>
				{loading}
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false} striped={true}>
						<TableRow>
							<TableHeaderColumn className={"center fullname"}>Nombre</TableHeaderColumn>
							<TableHeaderColumn className={"center"}>Acerca de</TableHeaderColumn>
							<TableHeaderColumn className={"center edit"}>Edit</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{
							groups.map((group, i) => (
								<TableRow key={i}>
									<TableRowColumn className={"center fullname"}>{group.name}</TableRowColumn>
									<TableRowColumn>{group.about}</TableRowColumn>
									<TableRowColumn className={"center edit"}>
										<Plus onClick={this.props.edit(group.id)}
										      className="edit"
										      hoverColor="blue"/>
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