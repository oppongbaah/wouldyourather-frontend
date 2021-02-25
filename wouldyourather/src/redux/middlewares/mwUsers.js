import * as actionCreators from '../actionCreators/acUsers';
import axios from 'axios';

const api = 'https://wouldyouratherapplication.herokuapp.com';

export function fetchUsers() {
    return (dispatch => {
        axios.get(`${api}/users/fetch-all`)
        .then(users => {
            users.data.map(user => {
                dispatch(actionCreators.userStatus("Hel"))
                dispatch(actionCreators.userStatus(user.response.status))
            })
        })
        .catch(err => {
            // 401: unauthorised user
            dispatch(actionCreators.userStatus(err.response.status))
        })
    })
}