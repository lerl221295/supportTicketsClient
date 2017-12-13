import { connect } from 'react-redux';
import { closeAlert } from '../../../common/actions/alert'
import { push } from 'react-router-redux';
import App from './App';

const mapStateToProps = (state) => ({
	isAuthenticate : state.user != null,
	alert: state.toast
});

const mapDispatchToProps = {
	closeAlert,
	push
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
