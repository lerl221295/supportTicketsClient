import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { alert } from './alert'

import ticketDetail from '../../modules/ticket/reducers'
import businessHours from '../../modules/businessHours/reducers'
import ticketFields from '../../modules/ticketFields/reducers'

const createReducers = () => (
	combineReducers({
		toast: alert,
		ticketDetail,
		businessHours,
		routing: routerReducer,
	    alert,
	    ticketDetail,
	    businessHours,
	    ticketFields,
	    routing: routerReducer,
		form: formReducer
	})
);

export default createReducers
