import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
/*import {user} from './user'*/

const createReducers = () => (
	combineReducers({
	    /*user,*/
	    routing: routerReducer,
		  form: formReducer
	})
);

export default createReducers
