import { 
	ADD_FIELD,
	SET_FIELDS,
	DELETE_FIELD,
	OPEN_MODAL,
	CLOSE_MODAL
} from '../actions/customFields'

const initialState = {
	fields: [],
	modals: {
		selectField: false,
		normalFields: false
	}
};

export default (state = initialState, {type, payload}) => do {
    if(type === SET_FIELDS) 
    	({ ...state, fields: payload.fields });
    else if(type === ADD_FIELD) 
    	({ ...state, fields: [...state, payload.field] });
    else if(type === DELETE_FIELD)
        ({
        	...state,
        	fields: Array.from(state.fields).filter(field => (
                field.key !== payload.field.key 
            ))
        })
    else if(type === OPEN_MODAL)
    	({...state, modals: {...state.modals, [payload.modalName]: true} })
    else if(type === CLOSE_MODAL)
    	({...state, modals: {...state.modals, [payload.modalName]: false} })
    else state;
}