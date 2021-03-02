import * as actions from '../actions';

const initialState = {
    data : []
}

function pollReducer(state = initialState, action){
    switch(action.type){
        case actions.ADD_POLL:
            return {...state, data:action.polls};
        default:
            return state;
    }
} 

export {
    pollReducer
}