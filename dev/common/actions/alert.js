export const CLOSE_ALERT = 'CLOSE_ALERT';
export const OPEN_ALERT = 'OPEN_ALERT';

export const closeAlert = () => ({
	type: CLOSE_ALERT
});

export const openAlert = (text) => ({
	type: OPEN_ALERT,
	payload: { text }
})
