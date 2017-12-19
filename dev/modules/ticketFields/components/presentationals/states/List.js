import React from 'react'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import { 
	ContentDeleteSweep as Delete,
	ImageTimer as Timer,
	ImageTimerOff as TimerOff,
	ContentArchive as Archive
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
							primaryText={state.label}
							onClick={() => openModal(state)}
							secondaryText={`key: ${state.key}`}
							leftIcon={do {
								if(state.stage === "END") (<Archive/>);
								else if(state.sla_paused) (<TimerOff/>);
								else (<Timer/>);
							}}
							rightIcon={do {
								if(state.key === "new" || state.key === "resolved")
									null;
								else (
									<Delete 
										hoverColor={Theme.palette.accent1Color}
										onClick={(e) => {
											e.stopPropagation();
											deleteState(state);
										}}
									/>
								)
							}}
						/>			
						<Divider/>
					</div>
				))
			}
		</List>
	)
}

export default StatesList
