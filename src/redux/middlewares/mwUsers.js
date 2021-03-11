import * as actionCreators from '../actionCreators/acUsers';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

const api = 'https://wouldyouratherapplication.herokuapp.com';

export function fetchUsers() {
    return (dispatch => {
        try {
            dispatch(actionCreators.loadUser([], "loading"));
    
            axios.get(`${api}/users/fetch-all`)
            .then(users => {
                dispatch(actionCreators.loadUser(users.data, "done"));
            })
            .catch(err => {
                console.log(err);
                dispatch(actionCreators.loadUser([], "failed"));
            })
        }
        catch (err){
            console.log(err);
        }
    })
}

export function authedUser(user) {
    return (dispatch => {
        try {
            dispatch(actionCreators.getAuthedUser("", "", "logging"));
    
            if (user === "Guest") {
                dispatch(actionCreators.getAuthedUser(user, "", "done"));
            }
            else {
                axios.get(`${api}/users/fetch/${user.trim()}`)
                .then(authedUser => {
                    dispatch(actionCreators.getAuthedUser(user, authedUser.data.imageURL, "done"))
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
        catch (err){
            console.log(err);
            dispatch(actionCreators.getAuthedUser("", "", "failed"));
        }
    })
}

export async function login(credentials) {
    try {
        return await fetch(`${api}/users/login`, {
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": api,
            "Content-Type": "application/json",
            'Authorization': `Basic ${credentials}`
          }
        })
        .then(data => data.json())
        .catch(err => console.log(err))
    }
    catch (e) {console.error(e)}
}

export async function signup(credentials, history) {
    try {
        return fetch(`${api}/users/signup`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
            })
            .then(data => {
                data.text().then(text => {
                    alert(text);
                    cookies.set("authedUser", credentials._id);
                    history.push("/");
                })
            })
            .catch(err => console.log(err))
    }
    catch (e) {console.error(e)}
}