import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './SLAFormContainer'
import CreateSLAPolicy from '../../graphql/mutations/createSLAPolicy.graphql'
import getSLAPolicies from '../../graphql/querys/slaPolicies.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(CreateSLAPolicy, {
  props: ({ mutate }) => ({
    submit: (client) => mutate({ 
    	variables: { client },
    	refetchQueries: [ { query: getSLAPolicies }]
    })
  })
})(formWithRedux);