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
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui/svg-icons/action/face'

class OrganizationsTable extends Component {
	/*constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
			editing: null
		}
	}*/
	
	componentWillReceiveProps = (nextProps) => {
		if(nextProps.search !== "") this.setState({current: 1});
	};
	
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
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Domains</TableHeaderColumn>
              <TableHeaderColumn>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
						{
							do {
								if(this.props.data.loading && !this.props.data.organizations) "";
								else {
									organizations.map((organization, i) => (
										<TableRow key={i}>
											<TableRowColumn>{organization.name}</TableRowColumn>
										  	<TableRowColumn>{organization.domains.join(', ')}</TableRowColumn>
											<TableRowColumn>
												<Plus onClick={this.props.edit(organization.id)}
												  style={{cursor: "pointer"}}
												  hoverColor="blue"/>
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