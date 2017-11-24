import React, { Component } from 'react'
import {List, ListItem, Paper, Subheader, Divider, Avatar, FlatButton} from "material-ui";
import {typography} from 'material-ui/styles';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import Face from 'material-ui/svg-icons/action/face'
import { Row, Col } from 'react-flexbox-grid'
import _ from 'lodash'

const styles = {
	subheader: {
		fontSize: 24,
		fontWeight: typography.fontWeightLight,
		backgroundColor: cyan600,
		color: white
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
			console.log("REsubscribiendome a estos:", nextProps.filter_form);
			this.props.subscribeToNewTickets(nextProps.filter_form);
		}
	}

	render = () => {
		const {tickets, loading} = this.props;
		if(loading && !tickets) return <h1>Cargando...</h1>
		return(
			<Paper>
				<Row>
					<Col xs={12} md={12} sm={12}>
						<List>
							<Subheader style={styles.subheader}>Tickets</Subheader>
							{
								tickets.map((ticket, i) =>
									<div key={i}>
										<ListItem
											leftAvatar={
												do {
													if(!ticket.client.face_base64) <Avatar icon={<Face/>} />
													else <Avatar src={ticket.client.face_base64} />
												}
											}
											primaryText={`#${ticket.number}: ${ticket.title}`}
											secondaryText={ticket.client.fullName}
											//rightIconButton={rightIconMenu}
										/>
										<Divider inset={true} />
									</div>
								)
							}
						</List>
					</Col>
					<Col xsOffset={5} xs={4} md={4} sm={4}>
						<FlatButton
							label="Cargar mas"
							primary={true}
							onClick={this.props.loadMoreTickets}
							disabled={this.props.loading}
						/>
					</Col>
				</Row>
			</Paper>
		)
	}
}

export default TicketList