import React, { Component } from 'react'
import {List, ListItem, Paper, Divider, FlatButton} from "material-ui";
import { Row, Col } from 'react-flexbox-grid'
import _ from 'lodash'
import Item from './TicketItemList'
// Common Components
import { WrappedSubheader } from '../../../../common/components'

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
		console.log("subscribiendome a estos tickets: ", this.props.filter_form);
		this.props.subscribeToNewTickets(this.props.filter_form);
	};

	componentWillReceiveProps = nextProps => {
		//console.log(!_.isEqual(nextProps.filter_form, this.props.filter_form))
		if(nextProps.filter_form && !_.isEqual(nextProps.filter_form, this.props.filter_form)){
			console.log("Resubscribiendome a estos:", nextProps.filter_form);
			this.props.subscribeToNewTickets(nextProps.filter_form);
		}
	};

	render = () => {
		const {tickets, loading} = this.props;
		if(loading && !tickets) return <h1>Cargando...</h1>
		return(
			<div>
				<WrappedSubheader>Tickets</WrappedSubheader>
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