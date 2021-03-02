import * as actions from '../actions';

export function loadUser(users) {
    return {
        type: actions.ADD_USER,
        users
    }
}

export function getAuthedUser(user, avatar) {
    return {
        type: actions.AUTHED_USER,
        payload: {
            authedUser: user,
            userAvatar: avatar
        }
    }
}
