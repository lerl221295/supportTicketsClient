import React from 'react'
import { connect } from 'react-redux' 
import { graphql, compose } from 'react-apollo'
import { getFormValues } from 'redux-form'
import TicketsReports from '../presentationals/sla/Reports'
import GetSlaReport from '../../graphql/querys/getSlaReport.graphql'
import { getPriorityText } from '../../../../common/utils/consts'

const ReduxContainer = connect(state => ({
	from: getFormValues('reportRange')(state) && getFormValues('reportRange')(state).from.toString(),
	to: getFormValues('reportRange')(state) && getFormValues('reportRange')(state).to.toString(),
	organizations_id: do {
		if(getFormValues('reportSlaOrganizations')(state))
			if(getFormValues('reportSlaOrganizations')(state).organizations.length)
				getFormValues('reportSlaOrganizations')(state).organizations.map(({id}) => id);
	}
}))

const ApolloContainer = graphql(GetSlaReport, {
	props: ({data}) => {
		if(data.complianceByType)
			data.complianceByType = data.complianceByType.map(({compliance, type}) => ({
				compliance,
				type: type.label
			}));
		if(data.complianceByPriority) 
			data.complianceByPriority = data.complianceByPriority.map(({priority, compliance}) => ({
				compliance,
				priority: getPriorityText(priority)
			}));
		return ({data});
	}
})


export default compose(
	ReduxContainer,
	ApolloContainer
)(TicketsReports)