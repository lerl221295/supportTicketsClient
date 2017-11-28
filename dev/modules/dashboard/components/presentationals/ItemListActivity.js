import React, { Component } from 'react'
import { Link } from 'react-router'
import { ListItem, Avatar } from 'material-ui'
import { grey500 } from 'material-ui/styles/colors'
import {typography} from 'material-ui/styles';
import Face from 'material-ui/svg-icons/action/face'
import { Row, Col } from 'react-flexbox-grid'
import TimeAgo from '../../../../common/components/TimeAgo'
// import { getPriorityText, getPriorityColor } from '../../../../common/utils/consts'

const avatarStyle = {
	marginLeft: '-0.5rem',
	marginRight: '0.5rem'
};

class Item extends Component {
	render = () => {
		const { id, ticket, time, type_autor, autor, action,  } = this.props;
		
		const autor_name = do {
			if (type_autor !== 'SYSTEM') `${autor.name} `;
			else `El sistema `;
		};
		
		return (
			<ListItem>
				<Row middle={"xs"}>
					<Col xs={1}>
						{
							do {
								// Si el autor viene en false, es el sistema el autor de la actividad
								if(type_autor == 'SYSTEM') (<Avatar style={avatarStyle} icon={<Face/>} />)
								else (<Avatar style={avatarStyle} src={autor.face_base64} />)
							}
						}
					</Col>
					<Col xs={11}>
						<Row>
							{
								do {
									if (action.type == 'ASSIGNMENT')
										(<div>{autor_name} asignó el ticket <a href="/">#{ticket.number}</a> a <Link to={{pathname: `/agents/${action.agent.id}`}}>{action.agent.name}</Link></div>);
									else
										if (action.type == 'UPDATE')
											(<div>{autor_name} cambió {action.prop_name} del ticket <a href="/">#{ticket.number}</a> a {action.new_value}</div>);
										else
											(<div>{autor_name} creó el ticket <a href="/">{ticket.title} (#{ticket.number})</a></div>);
								}
							}
						</Row>
						<Row>
							<TimeAgo style={{color: grey500, fontSize: '0.8rem', fontWeight: typography.fontWeightMedium}} date={time}/>
						</Row>
					</Col>
				</Row>
			</ListItem>
		)
	}
}

export default Item