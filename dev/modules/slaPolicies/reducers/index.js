import { ADD_HOLIDAY, SET_HOLIDAYS, DELETE_HOLIDAY } from '../actions/holidays'
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
        case DELETE_HOLIDAY:
        	/*solo debe haber un holiday por fecha*/
        	let newHolidays = [...state.holidays].filter(holiday => (
        		holiday.day !== payload.holiday.day ||
        		holiday.month !== payload.holiday.month
        	));
        	return({...state, holidays: newHolidays});
        case SET_MODE: return({...state, mode: payload.mode}) 
    }
    return state;
}