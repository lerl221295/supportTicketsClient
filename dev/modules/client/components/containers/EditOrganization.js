import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './OrganizationFormContainer'
import UpdateOrganization from '../../graphql/mutations/updateOrganization.graphql'
import Organizations from '../../graphql/querys/organizations.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(UpdateOrganization, {
  props: ({ mutate, ownProps: { routeParams } }) => ({
    submit: (organization) => mutate({ 
    	variables: { organization },
    	//refetchQueries: ['GetClients'] //ya no te necesito xD
    	optimisticResponse: {
    		__typename: 'Mutation',
    		updateOrganization : {
    			__typename: 'Organization',
    			...organization
    		}
    	},
    	update: (proxy, {data: {updateOrganization} }) => {
    		/*sin el try catch esto se va a la puta x( (no entiendo aun porque)
    		https://github.com/apollographql/apollo-client/issues/2051*/
		    try {
			    const data = proxy.readQuery({
				    query: Organizations
			    });
			    data.organizations.nodes.map(organization => {
				    if(organization.id !== updateOrganization.id) return organization;
				    return updateOrganization;
			    });
			    proxy.writeQuery({ query: Organizations, data });
		    }
    		catch(e){
    			//console.log(e);
    		}
    	}
    }),
    edit: routeParams.id
  })
})(formWithRedux)
