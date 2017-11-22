import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/single/ModalForm'
import createClient from '../../graphql/mutations/createClient.graphql'
import Clients from '../../graphql/querys/clients.graphql'

export default graphql(createClient, {
    props: ({ mutate }) => ({
        submit: (client) => mutate({
            variables: { client },
            refetchQueries: [ { query: Clients }]
        })
    })
})(ModalForm);

