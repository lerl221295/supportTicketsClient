import { connect } from 'react-redux';
import { closeAlert } from '../../../common/actions/alert'
import { push } from 'react-router-redux';
import App from './App';

const mapStateToProps = ({user, alert}) => ({
	isAuthenticate : user != null,
	alert
});

const mapDispatchToProps = {
	closeAlert,
	push
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
