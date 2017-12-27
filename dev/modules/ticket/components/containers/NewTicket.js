import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { connect }  from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import CreateTicket from '../../graphql/mutations/createTicket.graphql'
import { closeModal } from '../../actions/newTicket'
import { openAlert } from '../../../../common/actions/alert'
import Form from '../presentationals/NewTicket'

const MutateContainer = graphql(CreateTicket, {
	props: ({mutate, ownProps}) => ({
		onSubmit: ({agent, client, title, description, priority}) => {
			let ticket = {
				agent_id: agent.id,
				client_id: client.id,
				title,
				description,
				priority
			};
			mutate({
				variables: { ticket },
				refetchQueries: ['GetTickets']
			}).then(response => {
				ownProps.openAlert("Ticket Creado Exitosamente");
			})
		}
	})
})

const CustomContainer = Component => ({client: apolloClient, ...rest}) => {
	const searchData = (key, GraphqlQuery) => (search_text) => (
		apolloClient.query({
			query: GraphqlQuery,
			variables: {search_text}
		})
		.then( ({data} ) => ({options: data[key].nodes}))
	);

	return <Component {...rest} searchData={searchData}/>
}

export default compose(
	connect(null, { closeModal, openAlert }),
	MutateContainer,
	withApollo,
	CustomContainer,
	reduxForm({form: 'TicketForm'}),
)(Form)