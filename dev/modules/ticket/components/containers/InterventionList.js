import { connect } from 'react-redux'
import InterventionList from '../presentationals/details/InterventionList'

export default connect(({ticket}) => ({showActivities: ticket.showActivities}))(InterventionList)
