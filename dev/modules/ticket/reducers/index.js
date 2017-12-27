import { TOGGLE_ACTIVITIES } from '../actions/header'
import { OPEN_TICKET_MODAL, CLOSE_TICKET_MODAL } from '../actions/newTicket' 

const initialState = {
	showActivities: false,
	newTicketModalOpen: false
}

const modalReducer = (state, { type }) => do {
    if(type === OPEN_TICKET_MODAL) (true);
    else if(type === CLOSE_TICKET_MODAL) (false);
    else state;
}

const showActivitiesReducer = (state, { type }) => do {
	if(type === TOGGLE_ACTIVITIES ) (!state);
	else state;
}

export default (state = initialState, action) => ({
	showActivities: showActivitiesReducer(state.showActivities, action),
	newTicketModalOpen: modalReducer(state.newTicketModalOpen, action)
})