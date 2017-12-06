export const ADD_HOLIDAY = 'ADD_HOLIDAY';
export const SET_HOLIDAYS = 'SET_HOLIDAYS';

export const addHoliday = (holiday) => ({
	type: ADD_HOLIDAY,
	payload: {
		holiday: {
			name: holiday.newHolidayName,
			day: holiday.newHolidayDate.getDate(),
			month: holiday.newHolidayDate.getMonth()
		}
	}
});

export const setHolidays = (holidays) => ({
	type: SET_HOLIDAYS,
	payload: { holidays }
});
