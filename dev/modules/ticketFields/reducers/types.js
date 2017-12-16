import { ADD_TYPE, SET_TYPES, DELETE_TYPE } from '../actions/types'

const initialState = [];

export default (state = initialState, {type, payload}) => do {
    if(type === SET_TYPES) payload.types;
    else if(type === ADD_TYPE) ([payload.type, ...state]);
    else if(type === DELETE_TYPE)
        Array.from(state).filter(type => (
            type.key !== payload.type.key 
        ));
    else state;
}