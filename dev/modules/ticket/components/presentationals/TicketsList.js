import React, { Component } from 'react'
import {List, ListItem, Paper, Divider, FlatButton, IconMenu, IconButton, MenuItem} from "material-ui";
import { Row, Col } from 'react-flexbox-grid'
import _ from 'lodash'
import Item from './TicketItemList'
import { 
	ContentSort as Sort,
	ActionTrendingDown as DownOrder,
	ActionTrendingUp as UpOrder
} from 'material-ui/svg-icons'
// Common Components
import { WrappedSubheader, Loading } from '../../../../common/components'
import Theme from '../../../../theme-default'

const styles = {
	paper: {
		// maxHeight: '33rem'
		maxHeight: window.innerHeight - 124
	},
	paperOverflow: {
		overflowY: 'auto',
		overflowX: 'hidden'
	}
};

class TicketList extends Component {
	componentWillMount = () => {
		// console.log("subscribiendome a estos tickets: ", this.props.filter_form);
		this.props.subscribeToNewTickets(this.props.filter_form);
	};

	componentWillReceiveProps = nextProps => {
		//console.log(!_.isEqual(nextProps.filter_form, this.props.filter_form))
		if(nextProps.filter_form && !_.isEqual(nextProps.filter_form, this.props.filter_form)){
			// console.log("Resubscribiendome a estos:", nextProps.filter_form);
			this.props.subscribeToNewTickets(nextProps.filter_form);
		}
	};

	render = () => {
		const {tickets, loading} = this.props;
		if(loading && !tickets) return <Loading size={60} thickness={3}/>
		return(
			<div>
				<WrappedSubheader>
					<Row between="xs">
						<Col> Tickets </Col>
						<Col>
							<IconMenu
								color={Theme.palette.alternateTextColor}
						    	iconButtonElement={
						    		<IconButton tooltip="Ordenamiento">
						    			<Sort color={Theme.palette.alternateTextColor}/>
						    		</IconButton>
						    	}
						    	targetOrigin={{horizontal: 'left', vertical: 'top'}}
						    	anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						    	value={this.props.order}
						    	onChange={(e, value) => this.props.changeOrder(value)}
						    >
						      	<MenuItem leftIcon={<DownOrder/>} value="FALLING" primaryText="Descendente" />
						      	<MenuItem leftIcon={<UpOrder/>} value="UPWARD" primaryText="Ascendente" />
						    </IconMenu>
						</Col>
					</Row>
				</WrappedSubheader>
				<Paper style={{...styles.paper, ...styles.paperOverflow}}>
					<Row>
						<Col xs={12} md={12} sm={12}>
							<List>
								{
									tickets.map((ticket, i) =>
										<div key={i}>
											<ListItem
												containerElement={<Item {...ticket}/>}
											/>
											<Divider inset={true} />
										</div>
									)
								}
							</List>
						</Col>
						
					</Row>
					<Row center="xs">
						<Col xs={12} md={12} sm={12}>
							<FlatButton
								label="Cargar mas"
								primary={true}
								onClick={this.props.loadMoreTickets}
								fullWidth={true}
								disabled={this.props.loading}
							/>
						</Col>
					</Row>
				</Paper>
			</div>
		)
	}
}

export default TicketList