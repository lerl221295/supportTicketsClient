import React from 'react'
import { connect } from 'react-redux' 
import { graphql, compose } from 'react-apollo'
import { getFormValues } from 'redux-form'
import TicketsReports from '../presentationals/tickets/Reports'
import GetTicketsReport from '../../graphql/querys/getTicketsReport.graphql'
import { getPriorityText, getSourceText } from '../../../../common/utils/consts'

const ReduxContainer = connect(state => ({
	from: getFormValues('reportRange')(state) && getFormValues('reportRange')(state).from.toString(),
	to: getFormValues('reportRange')(state) && getFormValues('reportRange')(state).to.toString()
}))

const ApolloContainer = graphql(GetTicketsReport, {
	props: ({data}) => {
		if(data.ticketsByType) 
			data.ticketsByType = data.ticketsByType.map(({type, tickets}) => ({
				tickets,
				type: type.label
			}));
		if(data.ticketsByInterventionCount) 
			data.ticketsByInterventionCount = data.ticketsByInterventionCount.map(({interventions, tickets}) => ({
				tickets,
				interventions: do {
					if(interventions === "ONE") "1"; else
					if(interventions === "TWO") "2"; else
					if(interventions === "THREE") "3"; else
					if(interventions === "FOUR") "4"; else
					if(interventions === "FIVE") "5"; else
					if(interventions === "MORE_FIVE") "+5";
				}
			}));
		if(data.ticketsByPriority) 
			data.ticketsByPriority = data.ticketsByPriority.map(({priority, tickets}) => ({
				tickets,
				priority: getPriorityText(priority)
			}));
		if(data.ticketsBySource) 
			data.ticketsBySource = data.ticketsBySource.map(({source, tickets}) => ({
				tickets,
				source: getSourceText(source)
			}));
		return ({data});
	}
})


export default compose(
	ReduxContainer,
	ApolloContainer
)(TicketsReports)