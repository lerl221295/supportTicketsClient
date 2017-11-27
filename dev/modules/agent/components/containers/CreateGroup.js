import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { openAlert } from '../../../../common/actions/alert'
import FormContainer from './GroupFormContainer'
import createGroup from '../../graphql/mutations/createGroup.graphql'
import Groups from '../../graphql/querys/groups.graphql'

const formWithRedux = connect(null, { goBack, openAlert })(FormContainer);

export default graphql(createGroup, {
  props: ({ mutate }) => ({
    submit: (group) => mutate({
    	variables: { group },
    	refetchQueries: [ { query: Groups }]
    })
  })
})(formWithRedux);

