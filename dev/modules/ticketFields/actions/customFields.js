export const ADD_FIELD =  "ADD_FIELD";
export const SET_FIELDS = "SET_FIELDS";
export const DELETE_FIELD = "DELETE_FIELD";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const ADD_OPTION =  "ADD_OPTION";
export const DELETE_OPTION = "DELETE_OPTION";
export const SET_OPTIONS = "SET_OPTIONS";

export const openModal = (type) => ({
	type: OPEN_MODAL,
	payload: { type }
});

export const closeModal = (type) => ({
	type: CLOSE_MODAL,
	payload: { type }
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

export const addOption = (option) => ({
	type: ADD_OPTION,
	payload: { option }
});

export const deleteOption = (option) => ({
	type: DELETE_OPTION,
	payload: { option }
});

export const setOptions = (options) => ({
	type: SET_OPTIONS,
	payload: { options }
});