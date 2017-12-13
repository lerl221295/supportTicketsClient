export const ADD_ALERT = 'ADD_ALERT';
export const SET_ALERTS = 'SET_ALERTS';
export const DELETE_ALERT = 'DELETE_ALERT';

export const addAlert = (alert) => ({
	type: ADD_ALERT,
	payload: { ...alert }
});

export const deleteAlert = (alert) => ({
	type: DELETE_ALERT,
	payload: { ...alert }
});

export const setAlerts = (alerts) => ({
	type: SET_ALERTS,
	payload: [ ...alerts ]
});
