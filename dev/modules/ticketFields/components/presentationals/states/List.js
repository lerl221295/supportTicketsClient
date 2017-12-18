import React from 'react'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import { ContentDeleteSweep as Delete } from "material-ui/svg-icons";
import Theme from '../../../../../theme-default'

const StatesList = ({states, deleteState}) => {
	return(
		<List style={{display: do {
			if(states.length) null;
			else "none";
		}}}>
			<Subheader>Estados del Ticket</Subheader>
			{
				states.map(({key, label}, i) => (
					<div key={i}>
						<ListItem 
							primaryText={label}
							secondaryText={`key: ${key}`}
							rightIcon={
								<Delete 
									hoverColor={Theme.palette.accent1Color}
									onClick={() => deleteState({ key })} 
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

export default StatesList