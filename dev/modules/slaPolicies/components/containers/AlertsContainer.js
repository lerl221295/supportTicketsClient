import { connect } from 'react-redux'
import { deleteAlert } from '../../actions'
import Alerts from '../presentationals/Alerts'

export default connect( ({ alerts }) => ({ alerts }), { deleteAlert })(Alerts)