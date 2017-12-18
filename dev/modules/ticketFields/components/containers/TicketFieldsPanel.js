import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import Panel from '../presentationals/Panel'
import Metadata from '../../graphql/querys/ticketMetadata.graphql'
import { setTypes } from '../../actions/types'
import { setStates } from '../../actions/states'
import { setFields } from '../../actions/customFields'

export default compose(
	connect(null, { setTypes, setFields, setStates }),
	graphql(Metadata)
)(Panel);

