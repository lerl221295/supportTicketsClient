import { OPEN_ALERT, CLOSE_ALERT } from '../actions/alert'

const initialState = {
	open: false,
	text: "hola"
}

export const alert = (state = initialState, action) => {
	switch (action.type) {
        case CLOSE_ALERT : return({ ...state, open: false });
        case OPEN_ALERT :
        	return({
        		open: true,
        		text: action.payload.text
        	})     
    }
    return state;
}