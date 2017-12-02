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
import theme from '../../../../../theme-default'
import { ImageRemoveRedEye as Eye } from 'material-ui/svg-icons/index'

class OrganizationsTable extends Component {
	render = () => {
		let loading = do {
			if (this.props.data.loading) { <LinearProgress mode="indeterminate" /> }
			else { "" }
		}
		
		//let organizations = filter(this.camposFiltrar, this.props.data.organizations, this.props.search);
		let {organizations, total} = do {
			if(this.props.data.organizations) ({
				organizations: this.props.data.organizations.nodes,
				total: this.props.data.organizations.count
			});
			else ({organizations: [], total: 1});
		};
		
		let pags = Math.ceil(total/this.props.limit);
		return (
      <div>
				{loading}
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn className={"center fullname"}>Nombre</TableHeaderColumn>
              <TableHeaderColumn className={"center"}>Domains</TableHeaderColumn>
              <TableHeaderColumn className={"center edit"}>Detalle</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
						{
							do {
								if(this.props.data.loading && !this.props.data.organizations) "";
								else {
									organizations.map((organization, i) => (
										<TableRow key={i}>
											<TableRowColumn className={"center fullname"}>{organization.name}</TableRowColumn>
											<TableRowColumn className={"center"}>{organization.domains.join(', ')}</TableRowColumn>
											<TableRowColumn className={"center edit"}>
												<Eye onClick={this.props.edit(organization.id)}
												      style={{cursor: "pointer"}}
												      hoverColor={theme.palette.accent1Color}
												/>
											</TableRowColumn>
										</TableRow>
									))
								}
							}
						}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
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

export default OrganizationsTable;