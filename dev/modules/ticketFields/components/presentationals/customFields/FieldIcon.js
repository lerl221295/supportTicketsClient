import React from 'react'
import { 
	//EditorTextFields as TextAreaIcon,
	ActionSubject as TextAreaIcon,
	EditorShortText as TextIcon,
	ToggleCheckBox as CheckBoxIcon,
	ActionEvent as DateIcon,
	ImageFilter1 as NumberIcon,
	EditorFormatListBulleted as SelectIcon
} from "material-ui/svg-icons";

export const getIcon = type => do {
	if(type === "SELECT") SelectIcon;
	else if(type === "CHECKBOX") CheckBoxIcon;
	else if(type === "TEXT") TextIcon;
	else if(type === "TEXTAREA") TextAreaIcon;
	else if(type === "NUMBER") NumberIcon;
	else if(type === "DATE") DateIcon;
}

export default ({type, ...props}) => {
	const Icon = getIcon(type);
	return <Icon {...props} />
}