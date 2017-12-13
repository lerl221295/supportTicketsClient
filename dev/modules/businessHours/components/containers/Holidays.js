import { connect } from 'react-redux'
import { deleteHoliday } from '../../actions/holidays'
import Holidays from '../presentationals/Holidays'

export default connect( ({businessHours: {holidays} }) => ({holidays}), {deleteHoliday})(Holidays)