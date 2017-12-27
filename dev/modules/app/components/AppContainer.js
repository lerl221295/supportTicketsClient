import { connect } from 'react-redux';
import { closeAlert } from '../../../common/actions/alert'
import { push } from 'react-router-redux';
import { closeModal } from '../../ticket/actions/newTicket'
import App from './App';

const mapStateToProps = ({user, alert, ticketDetail}) => ({
	isAuthenticate : user != null,
	alert,
	modalOpen: ticketDetail.newTicketModalOpen
});

const mapDispatchToProps = {
	closeAlert,
	push,
	closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
