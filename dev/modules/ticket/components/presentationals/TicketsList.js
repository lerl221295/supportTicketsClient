import React, { Component } from 'react'
import {List, ListItem, Paper, Subheader, Divider, Avatar, FlatButton} from "material-ui";
import {typography} from 'material-ui/styles';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import Face from 'material-ui/svg-icons/action/face'
import { Row, Col } from 'react-flexbox-grid'
import _ from 'lodash'
import Item from './TicketItemList'

const styles = {
	subheader: {
		fontSize: 24,
		fontWeight: typography.fontWeightLight,
		backgroundColor: cyan600,
		color: white
	}
};

class TicketList extends Component {
	componentWillMount = () => {
		console.log("subscribiendome a estos tickets: ", this.props.filter_form);
		this.props.subscribeToNewTickets(this.props.filter_form);
	}

	componentWillReceiveProps = nextProps => {
		//console.log(!_.isEqual(nextProps.filter_form, this.props.filter_form))
		if(nextProps.filter_form && !_.isEqual(nextProps.filter_form, this.props.filter_form)){
			console.log("REsubscribiendome a estos:", nextProps.filter_form);
			this.props.subscribeToNewTickets(nextProps.filter_form);
		}
	}

	render = () => {
		const {tickets, loading} = this.props;
		if(loading && !tickets) return <h1>Cargando...</h1>
		return(
			<div>
				<Subheader style={styles.subheader}>Tickets</Subheader>
				<Paper style={{height: '32rem', overflowY: 'auto', overflowX: 'hidden'}}>
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
								style={{width: "100%"}}
								label="Cargar mas"
								primary={true}
								onClick={this.props.loadMoreTickets}
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