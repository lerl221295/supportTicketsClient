import React, { Component } from 'react'
import {List, ListItem, Paper, Subheader, Divider, Avatar, FlatButton} from "material-ui";
import {typography} from 'material-ui/styles';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import Face from 'material-ui/svg-icons/action/face'
import { Row, Col } from 'react-flexbox-grid'
import _ from 'lodash'
import Item from './TicketItemList'

const styles = {
	paper: {
		maxHeight: '33rem'
	},
	paperOverflow: {
		overflowY: 'auto',
		overflowX: 'hidden'
	},
	buttonFetchMore: {
		width: '100%'
	}
};

class TicketList extends Component {
	/*static defaultProps = {
		filter_form: {
			firstName: "",
			lastName: ""
		}
	}*/

	componentWillMount = () => {
		console.log("subscribiendome a estos tickets: ", this.props.filter_form);
		this.props.subscribeToNewTickets(this.props.filter_form);
	}

	componentWillReceiveProps = nextProps => {
		//console.log(!_.isEqual(nextProps.filter_form, this.props.filter_form))
		if(nextProps.filter_form && !_.isEqual(nextProps.filter_form, this.props.filter_form)){
			console.log("Resubscribiendome a estos:", nextProps.filter_form);
			this.props.subscribeToNewTickets(nextProps.filter_form);
		}
	}

	render = () => {
		const {tickets, loading} = this.props;
		if(loading && !tickets) return <h1>Cargando...</h1>
		return(
				<Row>
					<Col xs={12}>
						<Subheader className={"subheader"}>Tickets</Subheader>
						<Paper style={{...styles.paper, ...styles.paperOverflow}}>
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
							<Col xs={12}>
								<FlatButton
									label="Cargar mas"
									style={styles.buttonFetchMore}
									primary={true}
									onClick={this.props.loadMoreTickets}
									disabled={this.props.loading}
								/>
							</Col>
						</Paper>
					</Col>
				</Row>
		)
	}
}

export default TicketList