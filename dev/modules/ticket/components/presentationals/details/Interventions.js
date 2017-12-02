import React from 'react'
import { Paper } from 'material-ui'

import Intervention from './Intervention'
import Activity from './Activity'

export default ({interventions, activities, showActivities}) => {
	
	let listToShow = [...interventions]; // Array.from(interventions)
	if(showActivities) listToShow = [...listToShow, ... activities];

	listToShow.sort((a, b) => {
		if(a.__typename === "CreationActivity") return -1;
		else if(b.__typename === "CreationActivity") return 1;
		return new Date(a.time) - new Date(b.time)
	})

	return (
		<div>
			{
				listToShow.map((item, i) => {
					if(item.__typename === "Intervention") return <Intervention key={i} {...item}/>;
					else return <Activity key={i} {...item}/>
				})
			}
		</div>
	)
}