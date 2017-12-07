export const ADD_HOLIDAY = 'ADD_HOLIDAY';
export const SET_HOLIDAYS = 'SET_HOLIDAYS';
export const DELETE_HOLIDAY = 'DELETE_HOLIDAY';

export const addHoliday = (holiday) => ({
	type: ADD_HOLIDAY,
	payload: {
		holiday: {
			name: holiday.newHolidayName,
			day: holiday.newHolidayDate.getDate(),
			month: holiday.newHolidayDate.getMonth()+1
		}
	}
});

export const deleteHoliday = (holiday) => ({
	type: DELETE_HOLIDAY,
	payload: { holiday }
});

export const setHolidays = (holidays) => ({
	type: SET_HOLIDAYS,
	payload: { holidays }
});
