export const CHANGE_ORDER = 'CHANGE_ORDER';

export const changeOrder = (order) => ({
	type: CHANGE_ORDER,
	payload: { order }
});

