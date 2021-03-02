import * as actionCreators from '../actionCreators/acPolls';
import axios from 'axios';

// const api = 'https://wouldyouratherapplication.herokuapp.com';
const api = 'http://localhost:4000';

export function fetchPoll() {
    return (dispatch => {
        axios.get(`${api}/questions/fetch-all`)
        .then(polls => {
            dispatch(actionCreators.loadPoll(polls.data))
        })
        .catch(err => {
            console.log(err);
        })
    })
}
