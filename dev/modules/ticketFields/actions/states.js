export const ADD_STATE = 'ADD_STATE';
export const SET_STATES = 'SET_STATES';
export const DELETE_STATE = 'DELETE_STATE';

export const addState = (state) => ({
	type: ADD_STATE,
	payload: { state }
});

export const deleteState = (state) => ({
	type: DELETE_STATE,
	payload: { state }
});

export const setStates = (states) => ({
	type: SET_STATES,
	payload: { states }
});
