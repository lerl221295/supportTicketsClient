import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { alert } from './alert'

import ticketDetail from '../../modules/ticket/reducers'
import businessHours from '../../modules/businessHours/reducers'

const createReducers = () => (
	combineReducers({
	    alert,
	    ticketDetail,
	    businessHours,
	    routing: routerReducer,
		form: formReducer
	})
);

export default createReducers
