import React from 'react'
import Customized from './CustomizedWorkingHours'
import SameForDays from './SameForDaysWorkingHours'

const WorkingDays = ({mode, ...rest}) => (
	<div style={{padding: "1rem"}}>
		<div style={{display: do {
			if(mode === "CUSTOMIZED") null;
			else "none";
		}}}>
			<Customized {...rest} />	
		</div>
		<div style={{display: do {
				if(mode === "SAME_FOR_DAYS") null;
				else "none";
			}}}>
			<SameForDays {...rest} />
		</div>
	</div>
)

export default WorkingDays