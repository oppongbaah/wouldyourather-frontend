import * as actions from '../actions';

const initialState = {
    data : [],
    authedUser: "",
    avatarURL: ""
}

function userReducer(state=initialState, action){
    switch(action.type){
        case actions.ADD_USER:
            return {...state, data: action.users};
        case actions.AUTHED_USER:
            return {...state, 
                authedUser: action.payload.authedUser,
                avatarURL: action.payload.userAvatar
            };
        default:
            return state;
    }
} 

export default userReducer;