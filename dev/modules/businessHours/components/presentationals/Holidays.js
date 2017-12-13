import React from 'react'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import { ContentDeleteSweep as Delete } from "material-ui/svg-icons";
import Theme from '../../../../theme-default'

const Holidays = ({holidays, deleteHoliday}) => {
	return(
		<List style={{display: do {
			if(holidays.length) null;
			else "none";
		}}}>
			<Subheader>Dias Festivos</Subheader>
			{
				holidays.map(({name, day, month}, i) => (
					<div key={i}>
						<ListItem 
							primaryText={`${name} ${day}/${month}`}
							rightIcon={
								<Delete 
									hoverColor={Theme.palette.accent1Color}
									onClick={() => deleteHoliday({day, month})} 
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

export default Holidays