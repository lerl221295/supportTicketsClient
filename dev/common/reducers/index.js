import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { alert } from './alert'

const createReducers = () => (
	combineReducers({
	    alert,
	    routing: routerReducer,
		  form: formReducer
	})
);

export default createReducers
