import * as actions from '../actions';

const initialState = {
    payload : {data:[], status:""},
    authedUser: {name:"", url:"", status:""}
}

function userReducer(state=initialState, action){
    switch(action.type){
        case actions.GET_USER:
            return {...state, payload:
                 {
                     data: action.payload.users,
                     status: action.payload.status
                 }
            }
        case actions.AUTHED_USER:
            return {...state, authedUser:
                {
                    name: action.payload.name,
                    url: action.payload.avatar,
                    status: action.payload.status
                }
            }
        default:
            return state;
    }
} 

export default userReducer;