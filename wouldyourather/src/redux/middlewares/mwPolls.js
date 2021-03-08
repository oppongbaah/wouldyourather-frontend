import * as actionCreators from '../actionCreators/acPolls';
import axios from 'axios';

// const api = 'https://wouldyouratherapplication.herokuapp.com';
const api = 'http://localhost:5000';

export function fetchPoll() {
    return (dispatch => {
        try {
            dispatch(actionCreators.loadPoll([], "loading"));
    
            axios.get(`${api}/polls/fetch-all`)
            .then(polls => {
                let data = polls.data;
                // sort the polls in descending order of the timestamp
                const sortedPolls = data.map(poll => poll).sort((x, y) =>
                    x.timestamp < y.timestamp ? 1 : -1);

                dispatch(actionCreators.loadPoll(sortedPolls, "done"));
            })
            .catch(err => {
                console.log(err);
                dispatch(actionCreators.loadPoll([], "failed"))
            })
        }
        catch (e) {console.error(e)}
    })
}

export function getQuestion(qid) {
    try {
        axios.get(`${api}/polls/fetch/${qid}`)
        .then((poll) => {
            return poll.data;
        })
        .catch((err) => console.log(err))
    }
    catch (e) {console.error(e)}
}

export function vote(pid, uid, option) {
    return (dispatch => {        
        try {
            dispatch(actionCreators.vote([], "voting", ""));   
            axios.put(`${api}/polls/vote/${pid}/${uid}?option=${option}`)
            .then((question) => {
                dispatch(actionCreators.vote(question.data, "voted", option));
            })
            .catch((err) => {
                dispatch(actionCreators.vote([], "already voted", ""));
            })
        }
        catch (e) {console.error(e)}
    })
}

export function getBtnStatus(status) {
    return (dispatch => {
        try {
            dispatch(actionCreators.setBtnStatus(status));
        }
        catch (err) {console.log(err)}
    })
}

export function addQuestion(question) {
    return(dispatch => {
        try {
            dispatch(actionCreators.addQuestion({}, 'adding', ''));

            axios.post(`${api}/polls/add`, question)
            .then((res) => {
                dispatch(actionCreators.addQuestion(res.data.question,
                    'added', res.data.message));
            })
            .catch((err) => {
                console.log(err)
                dispatch(actionCreators.addQuestion({}, 'failed', 
                    'Error Adding Question'));
            })
        }
        catch (e) {console.log(e)}
    })
}