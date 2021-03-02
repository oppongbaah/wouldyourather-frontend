import * as actions from '../actions';

export function loadPoll(polls) {
    return {
        type: actions.ADD_POLL,
        polls
    }
}