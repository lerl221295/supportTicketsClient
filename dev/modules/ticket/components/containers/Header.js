import { connect } from 'react-redux'
import { toggleActivities } from '../../actions/header'
import Header from '../presentationals/details/Header'

export default connect(
	({ticketDetail}) => ({showActivities: ticketDetail.showActivities}),
	{ toggleActivities }
)
(Header)