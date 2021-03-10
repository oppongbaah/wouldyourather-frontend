import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import '../styles/login.css';
import {encode} from 'base-64';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';
import {login, authedUser} from '../redux/middlewares/mwUsers';
import axios from 'axios';

// instantiate cookie
const cookies = new Cookies();

const Login = (props) => {
    const [username, setUsername] = useState("Guest");
    const [password, setPassword] = useState("");
    const [remembered, setLoginCache] = useState(false);

    // an event to handle username textbox changes
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    // an event to handle password textbox changes
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    // an event to handle whether the username and password should be cached or not
    const handleLoginCache = (e) => {
        setLoginCache(e.target.checked);

        if(remembered) {
            console.log("remember")
        }
    }

    const directURL = (url) => {
        const qid = url.split("/")[2];
        const api = "https://wouldyouratherapplication.herokuapp.com";

        if (qid) {
            axios.get(`${api}/polls/fetch/${qid.trim()}`)
            .then((poll) => {
                props.history.push(url, {
                    question: poll.data,
                    users: props.users
                });
            })
            .catch(props.history.push('/page-not-found-return-home', true))
        }
    }

    // this finally handles the event that submits data to the server for approval
    const handleSubmit = (e) => {
        e.preventDefault();
        // authorisation
        const cred = encode(username + ":" + password);
        const loginInfo = login(cred);
        // set cookies
        loginInfo
        .then(res => {
            if (parseInt(res.status) === 200) {
                if(!cookies.get("authedUser")) {
                    let time = new Date();
                    // cookies expires in hour time
                    time.setTime(time.getTime() + (60*60*1000));
                    cookies.set('authedUser', res.name, { path: '/'});
                }
                // add the authed user to the store state
                props.dispatch_authedUser(res.name);
                // Tell the user that login is successful
                alert(res.message);
                // push the route to the location hook to redirect
                const previousPath = props.history.location.state.prevPath;
                const questionPath = props.history.location.state.questionPath;
                const directPath = props.history.location.state.directPath

                if(props.history.action === "REPLACE" && previousPath) {
                    // when refreshed
                    props.history.push(previousPath, true);
                }
                else if(props.history.action === "REPLACE" && questionPath) {
                    console.log(questionPath)
                    // when already logged in before
                    directURL(questionPath);
                }
                else if(props.history.action === "REPLACE" && directPath) {
                    // when logged out before
                    directURL(directPath);
                }
                else {
                    props.history.push('/', true);
                }
            }
            else if (parseInt(res.status) === 401) {
                alert(res.message);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    // return a decription and a login form
    return (
        <>
        <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>{props.location.state ? props.location.state.desc : "sign in"}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit.bind(this)} >
                        <div className="input-group form-group">
                            <input onChange={handleUsername.bind(this)} type="text" 
                            className="form-control" placeholder="username" />
                        </div>
                        <div className="input-group form-group">
                            <input onChange={handlePassword.bind(this)} type="password" className="form-control" 
                            placeholder="password" />
                        </div>
                        <div className="row align-items-center remember">
                            <input onChange={handleLoginCache} type="checkbox" />Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?
                        <Link 
                        to={{
                            pathname:'/users/signup',
                            state: {desc:'sign up'}
                        }}>
                        Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users.payload.data
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        dispatch_authedUser: (user) => dispatch(authedUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));