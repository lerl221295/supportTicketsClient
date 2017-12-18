import { ADD_STATE, SET_STATES, DELETE_STATE } from '../actions/states'

const initialState = [];

export default (reduxState = initialState, {type, payload}) => do {
    if(type === SET_STATES) payload.states;
    else if(type === ADD_STATE) ([payload.state, ...reduxState]);
    else if(type === DELETE_STATE)
        Array.from(reduxState).filter(state => (
            state.key !== payload.state.key 
        ));
    else reduxState;
}