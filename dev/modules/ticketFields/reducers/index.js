import { combineReducers } from 'redux'
import types from './types'
import states from './states'
import customFields from './customFields'

export default combineReducers({
	types,
	states,
	customFields
})