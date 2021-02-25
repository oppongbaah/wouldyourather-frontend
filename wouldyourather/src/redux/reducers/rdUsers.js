import * as actions from '../actions';

function userReducer(state=[], action){
    switch(action.type){
        case actions.ADD_USER:
            return [...state, action.payload]
        default:
            return state;
    }
}   

function userStatusReducer(state="", action) {
    if(action.type === actions.STATUS){
        return action.payload
    }
    else {
        return state
    }
}

export {
    userReducer,
    userStatusReducer
}