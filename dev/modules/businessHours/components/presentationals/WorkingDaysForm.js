import React from 'react'
import Customized from './CustomizedWorkingHours'
import SameForDays from './SameForDaysWorkingHours'

const WorkingDays = (props) => (
	<div style={{padding: "1rem"}}>
		<div style={{display: do {
			if(props.mode === "CUSTOMIZED") null;
			else "none";
		}}}>
			<Customized {...props} />	
		</div>
		<div style={{display: do {
				if(props.mode === "SAME_FOR_DAYS") null;
				else "none";
			}}}>
			<SameForDays {...props} />
		</div>
	</div>
)

export default WorkingDays