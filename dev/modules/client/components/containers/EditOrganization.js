import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/organizations/ModalForm'
import UpdateOrganization from '../../graphql/mutations/updateOrganization.graphql'
import Organizations from '../../graphql/querys/organizations.graphql'

export default graphql(UpdateOrganization, {
	props: ({ mutate, ownProps: {limit} }) => ({
		submit: (organization) => mutate({
			variables: { organization },
			//refetchQueries: ['GetOrganizations'] //ya no te necesito xD
			/*optimisticResponse: {
					__typename: 'Mutation',
					updateOrganization : {
							__typename: '0rganization',
							...organization
					}
			},*/
			update: (proxy, {data: {updateOrganization} }) => {
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
		})
	})
})(ModalForm)
