import {connect} from 'react-redux';
import {logout} from '../actions/user'
import {push} from 'react-router-redux'
import App from '../presentationals/App'

/*const verifyAuth(user){
	if(user) return true;
	return false;
}*/

const mapStateToProps = (state) => ({
	isAuthenticate : state.user != null
})

const mapDispatchToProps = {
	logout,
	push
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
