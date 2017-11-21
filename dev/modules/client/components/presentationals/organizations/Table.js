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

import FormEdit from '../../containers/EditOrganization'

//import filter from '../../../utils/filter'

class OrganizationsTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen : false,
			editing: null
		}
	}
	
	edit = organization => event =>  this.setState({editing: organization, modalOpen : true});
	
	closeModal = event => this.setState({ modalOpen : false });
	
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
												<Plus onClick={this.edit(organization)}
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
        <FormEdit
          title="Actualizar datos de la Organizacion"
          open={this.state.modalOpen}
          close={this.closeModal}
          editing={this.state.editing}
          notificate={this.props.notificate}
          limit={this.props.limit}
        />
      </div>
		)
	}
}

export default OrganizationsTable;