import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './OrganizationFormContainer'
import createOrganization from '../../graphql/mutations/createOrganization.graphql'
import Organizations from '../../graphql/querys/organizations.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(createOrganization, {
    props: ({ mutate }) => ({
        submit: (organization) => mutate({
            variables: { organization },
            refetchQueries: [{ query: Organizations, variables: {search_text: null, offset: null, limit: 7} }]
        })
    })
})(formWithRedux);