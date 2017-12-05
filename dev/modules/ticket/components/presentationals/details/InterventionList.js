import React from 'react'
import { Paper } from 'material-ui'

import Intervention from './Intervention'
import Activity from './Activity'

export default ({interventions, activities, showActivities, ...ticket}) => {
	
	let listToShow; // Array.from(interventions)
	if(showActivities) listToShow = [...interventions, ... activities];
	else listToShow = [activities[0], ...interventions]; //siempre la primera actividad

	listToShow.sort((a, b) => {
		if(a.__typename === "CreationActivity") return -1;
		else if(b.__typename === "CreationActivity") return 1;
		return new Date(a.time) - new Date(b.time)
	})

	return (
		<div>
			{
				listToShow.map((item, i) => {
					if(item.__typename === "Intervention") 
						return <Intervention key={i} {...item}/>;
					else 
						return <Activity key={i} {...item} ticket={ticket}/>
				})
			}
		</div>
	)
}