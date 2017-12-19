import { 
    ADD_STATE,
    UPDATE_STATE,
    SET_STATES,
    DELETE_STATE,
    OPEN_STATE_MODAL,
    CLOSE_STATE_MODAL
} from '../actions/states'

const initialState = {
    nodes: [],
    modal: {
        open: false,
        editing: null
    }
};

const mapState = (states, {came_from, ...state}) => ({
    ...state,
    came_from: do {
        if(came_from)
            came_from.map(key => {
                let status = states.find(state => state.key === key);
                const {came_from, ...state} = status;
                return state;
            })
        else null;    
    }
})

const statesReducer = (reduxState = [], {type, payload}) => {
    switch(type){
        case SET_STATES:
            return payload.states;
        case ADD_STATE:
            return([...reduxState, mapState(reduxState, payload.state)]);
        case UPDATE_STATE: 
            return(
                Array.from(reduxState).map((state) => {
                    if(state.key !== payload.state.key) return ({
                        ...state,
                        came_from: do {
                            if(state.came_from && state.came_from.length)
                                state.came_from.map(came => {
                                    if(came.key !== payload.state.key) return came;
                                    return({
                                        key: payload.state.key,
                                        label: payload.state.label
                                    })
                                });
                            else null
                        }
                    });
                    return mapState(reduxState, payload.state);
                })
            )
        case DELETE_STATE:
            return(
                Array.from(reduxState).filter(state => (
                    state.key !== payload.state.key 
                )).map(({came_from, ...rest}) => {
                    if(!came_from) return rest;
                    const new_came_from = came_from.filter(state => ( state.key !== payload.state.key))
                    return({
                        ...rest,
                        came_from: new_came_from
                    })
                })
            )
    }
    return reduxState;
}

const modalReducer = (state, {type, payload}) => do {
    if(type === OPEN_STATE_MODAL) ({ open: true, editing: payload.state });
    else if(type === CLOSE_STATE_MODAL) ({ open: false, editing: null });
    else state;
}

export default (state = initialState, action) => ({
    nodes: statesReducer(state.nodes, action),
    modal: modalReducer(state.modal, action)
})