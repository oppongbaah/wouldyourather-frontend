import * as actions from '../actions';

export function loadUser(users, status) {
    return {
        type: actions.ADD_USER,
        payload: {
            users,
            status
        }
    }
}

export function getAuthedUser(name, avatar, status) {
    return {
        type: actions.AUTHED_USER,
        payload: {
            name,
            avatar,
            status
        }
    }
}
