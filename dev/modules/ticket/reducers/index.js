import { TOGGLE_ACTIVITIES } from '../actions/header'

const initialState = {
	showActivities: false
}

export const ticketDetail = (state = initialState, action) => {
	switch (action.type) {
        case TOGGLE_ACTIVITIES : return({ ...state, showActivities: !state.showActivities });   
    }
    return state;
}