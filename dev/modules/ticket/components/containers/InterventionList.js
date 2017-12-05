import { connect } from 'react-redux'
import InterventionList from '../presentationals/details/InterventionList'

export default connect(({ticketDetail}) => ({showActivities: ticketDetail.showActivities}))(InterventionList)
