import React, { Component } from 'react'
import {List, ListItem, Paper, Subheader, Divider, Avatar} from "material-ui";
import {typography} from 'material-ui/styles';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import Face from 'material-ui/svg-icons/action/face'

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

	render = () => {
		const {tickets, loading} = this.props;
		if(loading && !tickets) return <h1>Cargando...</h1>
		return(
			<Paper>
				<List>
					<Subheader style={styles.subheader}>Tickets</Subheader>
					{
						tickets.map(ticket =>
							<div key={ticket.number}>
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
			</Paper>
		)
	}
}

export default TicketList