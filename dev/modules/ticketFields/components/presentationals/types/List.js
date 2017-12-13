import React from 'react'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import { ContentDeleteSweep as Delete } from "material-ui/svg-icons";
import Theme from '../../../../../theme-default'

const TypesList = ({types, deleteType}) => {
	return(
		<List style={{display: do {
			if(types.length) null;
			else "none";
		}}}>
			<Subheader>Items</Subheader>
			{
				types.map(({key, label}, i) => (
					<div key={i}>
						<ListItem 
							primaryText={label}
							secondaryText={`key: ${key}`}
							rightIcon={
								<Delete 
									hoverColor={Theme.palette.accent1Color}
									onClick={() => deleteType({ key })} 
								/>
							}
						/>			
						<Divider/>
					</div>
				))
			}
		</List>
	)
}

export default TypesList