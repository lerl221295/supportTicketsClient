export const ADD_STATE = 'ADD_STATE';
export const SET_STATES = 'SET_STATES';
export const DELETE_STATE = 'DELETE_STATE';
export const OPEN_STATE_MODAL = "OPEN_STATE_MODAL";
export const CLOSE_STATE_MODAL = "CLOSE_STATE_MODAL";
export const UPDATE_STATE = "UPDATE_STATE";

export const openModal = (state = null) => ({
	type: OPEN_STATE_MODAL,
	payload: { state }
});

export const closeModal = () => ({
	type: CLOSE_STATE_MODAL
});

export const addState = (state) => ({
	type: ADD_STATE,
	payload: { state }
});

export const updateState = (state) => ({
	type: UPDATE_STATE,
	payload: { state }
})

export const deleteState = (state) => ({
	type: DELETE_STATE,
	payload: { state }
});

export const setStates = (states) => ({
	type: SET_STATES,
	payload: { states }
});
