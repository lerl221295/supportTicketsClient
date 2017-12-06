import { ADD_HOLIDAY } from '../actions/holidays'
import { SET_HOLIDAYS } from '../actions/holidays'
import { SET_MODE } from '../actions/mode'

/*Lo correcto seria manejar cada subestado de businessHours en distintos reducers (archivos separados),
pero ya que este modulo usa reduxForm para los otros estados y redux solo para los holidays,
trabajare el subestado de holidays en este archivo*/

const initialState = {
	mode: null,
	holidays: []
}

export default (state = initialState, {type, payload}) => {
	switch (type) {
		case SET_HOLIDAYS : return({...state, holidays: payload.holidays}) 
        case ADD_HOLIDAY : return({ ...state, holidays: [...state.holidays, payload.holiday]}); 
        case SET_MODE: return({...state, mode: payload.mode}) 
    }
    return state;
}