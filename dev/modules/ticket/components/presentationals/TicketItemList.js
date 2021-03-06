import React, { Component } from 'react'
import { ListItem, Avatar, ToolbarSeparator } from 'material-ui'
import Face from 'material-ui/svg-icons/action/face'
import { Row, Col } from 'react-flexbox-grid'
import { TimeAgo, WrappedLink } from '../../../../common/components'
import { getPriorityText, getPriorityColor } from '../../../../common/utils/consts'

class Item extends Component {
	render = () => {
		const { client, agent, state, type, title, number, priority, time, resolve_by } = this.props;
		return (
			<ListItem>
				<Row middle="xs">
					<Col xs={1} md={1} sm={1} style={{
						borderLeft: `thick solid ${getPriorityColor(priority)}`
					}}>
						{
							do {
								if(!client.face_base64) (<Avatar icon={<Face/>} />)
								else (<Avatar src={client.face_base64} />)
							}
						}
					</Col>
					<Col xs={7}>
						<Row>
							<span>
								{title}
								<WrappedLink to={`/tickets/${number}`}>
									{`#${number}`}
								</WrappedLink>
							</span>
						</Row>
						<Row>
							<span>
								Por: <WrappedLink to={`clients/${client.id}`}>{`${client.fullName}`}</WrappedLink>
							</span>
						</Row>
						<Row>
							<span>
								Creado: <TimeAgo date={time}/>, Plazo de entrega: <TimeAgo date={resolve_by}/>
							</span>
						</Row>
					</Col>
					<Col xs={1}>
						<ToolbarSeparator style={{height: '3rem'}}/>
					</Col>
					<Col xs={3} md={3} sm={3}>
						<Row>
							<span>
								Agente: {do {
									if(agent)
										<WrappedLink to={`/admin/agents/${agent.id}`}>{`${agent.fullName}`}</WrappedLink>;
									else
										"No Asignado";
								}}
							</span>
						</Row>
						<Row>
							<span>
								Estado: {state.label}
							</span>
						</Row>
						<Row>
							<span>
								Prioridad: {getPriorityText(priority)}
							</span>
						</Row>
					</Col>
				</Row>
			</ListItem>
		)
	}
}

export default Item