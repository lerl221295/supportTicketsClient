import { connect } from 'react-redux'
import TicketList from '../presentationals/TicketsList'

const mapStateToProps = (state) => ({
	filter_form : state.form.FilterForm.values
});

export default connect(mapStateToProps)(TicketList)