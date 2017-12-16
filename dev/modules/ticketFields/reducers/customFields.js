import { 
	ADD_FIELD,
	SET_FIELDS,
	DELETE_FIELD,
	OPEN_MODAL,
	CLOSE_MODAL,
    ADD_OPTION,
    DELETE_OPTION,
    SET_OPTIONS
} from '../actions/customFields'

const initialState = {
	fields: [],
	modals: {
		selectField: {
            open: false,
            type: "SELECT",
            options: []
        },
		normalFields: {
            open: false,
            type: ""
        }
	}
};

const getModalName = type => do {
    if(type === "SELECT") "selectField";
    else "normalFields";
}

const recalculatePosition = (element, i) => ({...element, position: i+1});

export default (state = initialState, {type, payload}) => do {
    if(type === SET_FIELDS) 
    	({ ...state, fields: payload.fields });
    else if(type === ADD_FIELD) 
    	({ ...state, fields: 
            [...state.fields, {...payload.field, position: state.fields.length+1}]
        });
    else if(type === DELETE_FIELD)
        ({
        	...state,
        	fields: Array.from(state.fields).filter(field => (
                field.key !== payload.field.key 
            )).map(recalculatePosition)
        })
    else if(type === SET_OPTIONS) 
        ({ ...state, modals: {
            ...state.modals,
            selectField: {
                ...state.modals.selectField,
                options: payload.options
            }
        }})
    else if(type === ADD_OPTION) 
        ({ ...state, modals: {
            ...state.modals,
            selectField: {
                ...state.modals.selectField,
                options: [
                    ...state.modals.selectField.options,
                    {...payload.option, position: state.modals.selectField.options.length+1}
                ]
            }
        }})
    else if(type === DELETE_OPTION)
        ({ ...state, modals: {
            ...state.modals,
            selectField: {
                ...state.modals.selectField,
                options: Array.from(state.modals.selectField.options).filter(option => (
                    option.key !== payload.option.key 
                )).map(recalculatePosition)
            }
        }})
    else if(type === OPEN_MODAL)
    	({...state, modals: {
                ...state.modals, 
                [getModalName(payload.type)]: {
                    ...state.modals[getModalName(payload.type)],
                    open: true,
                    type: payload.type
                }
            } 
        })
    else if(type === CLOSE_MODAL)
    	({...state, modals: {...state.modals, [getModalName(payload.type)]: {
                ...state.modals[getModalName(payload.type)],
                open: false
            }} 
        })
    else state;
}

