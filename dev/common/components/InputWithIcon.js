import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

const InputWithIcon = ({Icon, Input, ...props, children}) => (
		<Row bottom="xs">
			<Col xs={2} md={1}>
				<Icon color="skyBlue"/>
			</Col>
			<Col xs={10} md={11}>
				<Input style={{width: '100%'}} {...props} >
					{children}
				</Input>
			</Col>
		</Row>
)

export default InputWithIcon