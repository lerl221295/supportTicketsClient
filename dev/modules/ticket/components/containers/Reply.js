import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import TicketDetails from '../../graphql/querys/ticketDetails.graphql'
import AddIntervention from '../../graphql/mutations/addIntervention.graphql'
import Reply from '../presentationals/details/Reply'

const generateSource = file => new Promise((resolve) => {
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve({ data: { link: reader.result } });
})

const updateApolloCache = ({ticket_number, text}) => (proxy, {data: {addIntervention} }) => {
	try {
		const data = proxy.readQuery({ 
			query: TicketDetails,
			variables: { number: ticket_number }
		});
		let newData = {...data};
		let newIntervention = {
			...addIntervention,
			text,
			time: new Date().toString()
		}
		newData.ticket.interventions = [...data.ticket.interventions, newIntervention]
		proxy.writeQuery({ 
			query: TicketDetails,
			variables: { number: ticket_number },
			data: {...newData}
		});
	}
	catch(e){
		console.log(e)
	}
};

export default compose(
	graphql(AddIntervention, {
		props: ({mutate}) => ({
			sendIntervention: (intervention) => mutate({
				variables: { intervention },
				update: updateApolloCache(intervention)
			})
		})
	}),
	reduxForm({ form: 'reply' }),
	connect((state) => ({
			reply: getFormValues('reply')(state)
		})
	)	
)
(props => <Reply {...props} generateSource={generateSource}/>)