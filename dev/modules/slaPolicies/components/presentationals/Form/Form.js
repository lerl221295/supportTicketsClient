import React from 'react'
// Material UI
import { Paper } from 'material-ui'
// Common Components
import { FormButtonGroup } from '../../../../../common/components'
// Presentationals Components
import PoliciesTable from './PoliciesTable'
import Header from './Header'
import ApplyPolicyTo from './ApplyPolicyTo'
import PolicyBasicData from './PolicyBasicData'
import Alerts from './Alerts'

export default ({ searchData, goBack, handleSubmit, dirty }) => {
	return (
		<Paper>
			<Header
				goBack={goBack}
				dirty={dirty}
				handleSubmit={handleSubmit}
			/>
			<form className="padding">
				<PolicyBasicData />
				<br/>
				<PoliciesTable />
				<br/>
				<ApplyPolicyTo searchData={searchData}/>
				<br/>
				<Alerts searchData={searchData}/>
				<FormButtonGroup
					cancel={goBack}
					send={() => {handleSubmit()}}
					disabled={!dirty}
				/>
			</form>
		</Paper>
	);
}