import { connect } from 'react-redux'
import { toggleActivities } from '../../actions/header'
import Header from '../presentationals/details/Header'

export default connect(
	({ticket}) => ({showActivities: ticket.showActivities}),
	{ toggleActivities }
)
(Header)