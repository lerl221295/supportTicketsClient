import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './OrganizationFormContainer'
import UpdateOrganization from '../../graphql/mutations/updateOrganization.graphql'
import Organizations from '../../graphql/querys/organizations.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateOrganization, {
  props: ({ mutate, ownProps: { routeParams: {id} } }) => ({
    edit: id,
    submit: (organization) => mutate({ 
    	variables: { organization },
    	//refetchQueries: ['GetClients'] //ya no te necesito xD
    	optimisticResponse: {
    		__typename: 'Mutation',
    		updateOrganization : {
    			__typename: 'Organization',
    			...organization
    		}
    	}
    })
  })
})(formWithRedux)
