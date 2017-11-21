import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import { search_text } from './search'
/*import {user} from './user'*/

const createReducers = () => (
	combineReducers({
	    /*user,*/
		search_text,
	    routing: routerReducer
	})
)

export default createReducers
