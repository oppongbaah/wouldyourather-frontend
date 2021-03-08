import * as actions from '../actions';

const initialState = {
    payload : {data:[], status:''},
    vote: {data:[], status:'', option: ''},
    btnStatus: "recommended",
    addedQuestion: {data:{}, status:'', message:''}
}

function pollReducer(state = initialState, action){
    switch(action.type){
        case actions.GET_POLL:
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
        case actions.ADD_POLL:
            return {...state, addedQuestion:
                {
                    data: action.payload.question,
                    status: action.payload.status,
                    message: action.payload.message
                }
            }
        default:
            return state;
    }
} 

export {
    pollReducer
}