import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/organizations/ModalForm'
import createOrganization from '../../graphql/mutations/createOrganization.graphql'
import Organizations from '../../graphql/querys/organizations.graphql'

export default graphql(createOrganization, {
    props: ({ mutate }) => ({
        submit: (organization) => mutate({
            variables: { organization },
            refetchQueries: [ { query: Organizations }]
        })
    })
})(ModalForm);

