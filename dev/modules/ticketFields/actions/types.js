export const ADD_TYPE = 'ADD_TYPE';
export const SET_TYPES = 'SET_TYPES';
export const DELETE_TYPE = 'DELETE_TYPE';

export const addType = (type) => ({
	type: ADD_TYPE,
	payload: { type }
});

export const deleteType = (type) => ({
	type: DELETE_TYPE,
	payload: { type }
});

export const setTypes = (types) => ({
	type: SET_TYPES,
	payload: { types }
});
