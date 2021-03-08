import * as actions from '../actions';

const initialState = {
    payload : {data:[], status:''},
    vote: {data:[], status:'', option: ''},
    btnStatus: "recommended"
}

function pollReducer(state = initialState, action){
    switch(action.type){
        case actions.ADD_POLL:
            return {...state, payload:
                {
                    data: action.payload.polls,
                    status: action.payload.status
                }
            }
        case actions.VOTE:
            return {...state, vote: 
                {
                    data: action.payload.question,
                    status: action.payload.status,
                    option: action.payload.option
                }
            }
        case actions.BTN_STATUS:
            return {...state, btnStatus: action.status}
        default:
            return state;
    }
} 

export {
    pollReducer
}