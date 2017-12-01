import React from 'react'
import theme from '../../theme-default'
import {Subheader} from "material-ui";

export default ({children}) => (
	<Subheader style={{
		backgroundColor: theme.palette.primary2Color,
		fontSize: '1.4rem',
		fontWeight: '300',
		color: theme.palette.alternateTextColor,
		padding: '0 1rem'
	}}>{children}</Subheader>
)