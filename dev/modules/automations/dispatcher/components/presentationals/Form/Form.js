import React from 'react'
// Material UI
import {LinearProgress, Paper} from 'material-ui'
// Common Components
import { FormButtonGroup } from '../../../../../../common/components'
import Header from './Header'
// Presentationals Components
import BasicData from './BasicData'
import Conditions from './Conditions'
import Actions from './Actions'
import {FieldArray} from "redux-form";
// import ApplyPolicyTo from './ApplyPolicyTo'
// import Alerts from './Alerts'

export default ({ searchData, goBack, handleSubmit, dirty, TicketFieldsMetadata: { loading: loadingFields, ticketMetadata } }) => {
	if (loadingFields)
		return <LinearProgress mode="indeterminate" />;
	let { default_fields, custom_fields } = ticketMetadata;
	return (
		<Paper>
			<Header
				goBack={goBack}
				dirty={dirty}
				handleSubmit={handleSubmit}
			/>
			<form className="padding">
				<BasicData /><br/>
				<FieldArray name="conditions" searchData={searchData} ticketsFields={[...default_fields, ...custom_fields]} component={Conditions} /><br/>
				<FieldArray name="actions" searchData={searchData} ticketsFields={[...default_fields, ...custom_fields]} component={Actions} />
				<FormButtonGroup
					cancel={goBack}
					send={() => {handleSubmit()}}
					disabled={!dirty}
				/>
			</form>
		</Paper>
	);
}