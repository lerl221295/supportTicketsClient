import React, { Component } from 'react'
import { ListItem, Avatar } from 'material-ui'
import { grey500 } from 'material-ui/styles/colors'
import {typography} from 'material-ui/styles';
import Face from 'material-ui/svg-icons/action/face'
import Computer from 'material-ui/svg-icons/hardware/computer'
import { Row, Col } from 'react-flexbox-grid'
import { TimeAgo, ActionsList, WrappedLink } from '../../../../common/components'

class Item extends Component {
	render = () => {
		const { type, ticket, type_autor, autor, time, actions  } = this.props;
		let autor_name;
		if (type_autor)
			autor_name = do {
				if (type_autor == 'SYSTEM') `El sistema `;
				else <WrappedLink to={{pathname: `/agents/${autor.id}`}}>{autor.name}</WrappedLink>;
			};
		
		return (
			<ListItem>
				<Row middle={"xs"}>
					<Col xs={1}>
						{
							do {
								if (type == 'CREATION')
									if (ticket.client.face_base64) <Avatar src={ticket.client.face_base64} />;
									else <Avatar icon={<Face/>} />;
								else
									if (type_autor == 'AGENT')
										if (autor.face_base64) <Avatar src={autor.face_base64} />;
										else <Avatar icon={<Face/>} />;
									else <Avatar icon={<Computer/>} />;
							}
						}
					</Col>
					<Col xs={11} style={{paddingLeft: '1.3rem'}}>
						<Row>
							{
								do {
									if (type == 'CREATION')
										(<div>
											<WrappedLink to={{pathname: `/clients/${ticket.client.id}`}}>{ticket.client.name} </WrappedLink>
											creó el ticket <WrappedLink to={{pathname: `/tickets`}}>{ticket.title} (#{ticket.number})</WrappedLink>
										</div>)
									else
										(<div>
											<div>{autor_name} actualizó el ticket <WrappedLink to={{pathname: `/tickets`}}>{ticket.title} (#{ticket.number})</WrappedLink>:</div>
											<ActionsList actions={actions}/>
										</div>)
								}
							}
						</Row>
						<Row>
							<TimeAgo style={{color: grey500, fontSize: '0.8rem', fontWeight: typography.fontWeightMedium}} date={time || ticket.time}/>
						</Row>
					</Col>
				</Row>
			</ListItem>
		)
	}
}

export default Item