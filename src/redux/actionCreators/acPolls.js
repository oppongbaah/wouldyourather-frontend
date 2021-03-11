import * as actions from '../actions';

export function loadPoll(polls, status) {
    return {
        type: actions.GET_POLL,
        payload: {
            polls,
            status
        }
    }
}

export function vote(question, status, option) {
    return {
        type: actions.VOTE,
        payload: {
            question,
            status,
            option
        }
    }
}

export function setBtnStatus(status) {
    return {
        type: actions.BTN_STATUS,
        status
    }
}

export function addQuestion(question, status, message) {
    return {
        type: actions.ADD_POLL,
        payload: {
            question,
            status,
            message
        }
    }
}