import { graphql } from 'react-apollo'
//import { connect } from 'react-redux'
import ModalForm from '../presentationals/groups/ModalForm'
import createGroup from '../../graphql/mutations/createGroup.graphql'
import groups from '../../graphql/querys/groups.graphql'

export default graphql(createGroup, {
  props: ({ mutate }) => ({
    submit: (group) => mutate({
    	variables: { group },
    	refetchQueries: [ { query: groups }]
    })
  })
})(ModalForm);

