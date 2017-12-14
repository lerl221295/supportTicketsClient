export const ADD_FIELD =  "ADD_FIELD";
export const SET_FIELDS = "SET_FIELDS";
export const DELETE_FIELD = "DELETE_FIELD";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalName) => ({
	type: OPEN_MODAL,
	payload: { modalName }
});

export const closeModal = (modalName) => ({
	type: CLOSE_MODAL,
	payload: { modalName }
});

export const addField = (field) => ({
	type: ADD_FIELD,
	payload: { field }
});

export const setFields = (fields) => ({
	type: SET_FIELDS,
	payload: { fields }
});

export const deleteField = (field) => ({
	type: DELETE_FIELD,
	payload: { field }
});