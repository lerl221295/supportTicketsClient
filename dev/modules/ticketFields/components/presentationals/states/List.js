import React from 'react'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import { 
	ContentDeleteSweep as Delete,
	ImageTimer as Timer,
	ImageTimerOff as TimerOff
} from "material-ui/svg-icons";
import Theme from '../../../../../theme-default'

const StatesList = ({states, deleteState, openModal}) => {
	return(
		<List style={{display: do {
			if(states.length) null;
			else "none";
		}}}>
			<Subheader>Estados del Ticket</Subheader>
			{
				states.map((state, i) => (
					<div key={i}>
						<ListItem 
							primaryText={
								<strong onClick={() => openModal(state)}>
									{state.label}
								</strong>
							}
							secondaryText={`key: ${state.key}`}
							leftIcon={do {
								if(state.sla_paused) (<TimerOff/>);
								else (<Timer/>);
							}}
							rightIcon={
								<Delete 
									hoverColor={Theme.palette.accent1Color}
									onClick={() => deleteState(state)} 
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