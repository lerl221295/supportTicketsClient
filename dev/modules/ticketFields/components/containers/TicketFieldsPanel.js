import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import Panel from '../presentationals/Panel'
import Metadata from '../../graphql/querys/ticketMetadata.graphql'
import { setTypes } from '../../actions/types'

export default compose(
	connect(null, { setTypes }),
	graphql(Metadata)
)(Panel);

