import React from 'react'
import {Link} from 'react-router'
import theme from '../../theme-default'

export default ({to, children}) => (
	<Link to={to} style={{color: theme.palette.accent1Color}}>
		{children}
	</Link>
)