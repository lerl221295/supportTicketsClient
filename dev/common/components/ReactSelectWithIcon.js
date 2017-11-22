import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Select from 'react-select'

const ReactSelectWithIcon = ({Icon, label, ...props}) => (
  <Row bottom={"xs"}>
    <Col md={12}>
      <label style={{
				color: "rgba(0, 0, 0, 0.3)",
				fontSize: "0.8rem",
				marginLeft: "2rem"
			}}>{label}</label>
    </Col>
    <Col xs md={1}>
      <Icon color="skyBlue"/>
    </Col>
    <Col xs={10} md={11}>
      <Select.Async {...props} style={{ marginBottom: '0.8rem', marginTop: '0.2rem' }} />
    </Col>
  </Row>
);

export default ReactSelectWithIcon