import React from 'react'
import {MenuItem} from "material-ui";

export const menuItemOptions = (options ) => (options.map( ({value, key, id, label, name}, i) => (
	<MenuItem key={i} value={value || key || id} primaryText={label || name} />
)));