import { CHANGE_SEARCH_TEXT } from '../actions/search'

export const search_text = (state = '', action) => {
	switch (action.type) {
        case CHANGE_SEARCH_TEXT :
            return action.text;
            break;
    }
    return state;
}