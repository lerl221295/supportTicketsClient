import React from 'react'
import { Paper } from 'material-ui'

export default props => {

	const html = "<h1> soy una intervencion </h1>";

	return (
		<Paper
			style={{margin: "0.6rem"}} 
			dangerouslySetInnerHTML={{__html: html}}
		/>	
	)
}