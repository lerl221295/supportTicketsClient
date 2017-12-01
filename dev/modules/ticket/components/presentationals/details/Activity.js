import React from 'react'
import { Paper } from 'material-ui'

export default props => {
	return (
		<Paper style={{margin: "0.6rem"}} >
			{JSON.stringify(props)}
		</Paper>			
	)
}