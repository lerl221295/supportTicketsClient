import React from 'react'
import {MenuItem} from "material-ui";

export const menuItemOptions = (options ) => (options.map( (option, i) => (
	<MenuItem key={i} value={option.value} primaryText={option.label} />
)));