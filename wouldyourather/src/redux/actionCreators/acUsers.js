import * as actions from '../actions';

export function loadUser(user) {
    return {
        type: actions.ADD_USER,
        payload: {
            _id: user._id,
            username: user.username,
            image: user.imageURL,
            questions: user.questions,
            answers: user.answers,
            password: user.password
        }
    }
}

export function userStatus(status) {
    return {
        type: actions.STATUS,
        payload: {
            status
        }
    }
}