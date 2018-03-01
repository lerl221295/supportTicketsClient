import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './ClientFormContainer'
import createClient from '../../graphql/mutations/createClient.graphql'
import Clients from '../../graphql/querys/clients.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(createClient, {
  props: ({ mutate }) => ({
    submit: (client) => mutate({ 
    	variables: { client },
    	refetchQueries: [ { query: Clients, variables: {search_text: null, offset: null, limit: 7} }]
    })
  })
})(formWithRedux);

