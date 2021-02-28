import * as actions from '../actions';

function userReducer(state=[], action){
    switch(action.type){
        case actions.ADD_USER:
            return action.users
        default:
            return state;
    }
} 

function authedUserReducer(state="", action){
    if (action.type === actions.AUTHED_USER) {
        return action.authedUser;
    }
    else {
        return state;
    }
}

export {
    userReducer,
    authedUserReducer
}