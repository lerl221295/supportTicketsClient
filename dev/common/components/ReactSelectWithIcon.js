import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Select from 'react-select'
import Theme from '../../theme-default'

const ReactSelectWithIcon = ({Icon, label, ...props}) => (
  <Row bottom={"xs"} style={{marginBottom: "1.2rem"}}>
	  <Col xs={12}>
		  <Row>
			  <Col xs md>
			  </Col>
			  <Col xs={10} md={11}>
				  <label style={{
					  color: "rgba(0, 0, 0, 0.3)",
					  fontSize: "0.8rem"
				  }}>{label}</label>
			  </Col>
		  </Row>
	  </Col>
	  {
		  do {
			  if (Icon) (
				  <Col xs={2} md={1}>
					  <Icon color={Theme.palette.accent2Color}/>
				  </Col>
			  )
		  }
	  }
	  <Col xs md>
		  <Select.Async
		  	searchPromptText="Escribe para buscar" 
		  	{...props} 
		  	style={{ marginBottom: '0.2rem', marginTop: '0.2rem' }}
		  />
	  </Col>
  </Row>
);

export default ReactSelectWithIcon