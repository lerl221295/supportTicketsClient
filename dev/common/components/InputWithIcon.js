import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Theme from '../../theme-default'

const InputWithIcon = ({Icon, Input, style, ...props, children}) => (
		<Row bottom="xs" style={style}>
			{
				  do {
					  if (Icon) (
						  <Col xs={2} md={1}>
							  <Icon color={Theme.palette.accent2Color} />
						  </Col>
					  )
				  }
			}
			<Col xs={10} md={11}>
				<Input style={{width: '100%'}} {...props} >
					{children}
				</Input>
			</Col>
		</Row>
)

export default InputWithIcon