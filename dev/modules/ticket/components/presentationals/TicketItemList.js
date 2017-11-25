import React, { Component } from 'react'
import { ListItem, Avatar } from 'material-ui'
import Face from 'material-ui/svg-icons/action/face'
import { Row, Col } from 'react-flexbox-grid'
import TimeAgo from '../../../../common/components/TimeAgo'
import { getPriorityText, getPriorityColor } from '../../../../common/utils/consts'

class Item extends Component {
	render = () => {
		const { client, agent, state, type, title, number, priority, time, resolve_by } = this.props;
		return (
			<ListItem>
				<Row>
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
					<Col xs={8} md={8} sm={8}>
						<Row>
							{`${title} #${number}`}
						</Row>
						<Row>
							Por:{` ${client.fullName}`}
						</Row>
						<Row>
							<span>
								Creado: <TimeAgo date={time}/>, Plazo de entrega: <TimeAgo date={resolve_by}/>
							</span>
						</Row>
					</Col>
					<Col xs={3} md={3} sm={3}>
						<Row>
							<span>
								Agente: {agent.fullName}
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