import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {fetchUsers, authedUser} from '../redux/middlewares/mwUsers';
import Navigation from './NavBar';
import '../styles/login.css';
import '../styles/App.css';
import {signup} from '../redux/middlewares/mwUsers';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Signup = (props) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [file, setFileName] = useState("");

    /* eslint-disable */
    useEffect(() => {
        props.dispatch_fetchUsers();
    }, [])

    useEffect(() => {
        if(cookies.get("authedUser")) {
            props.dispatch_authedUser(cookies.get("authedUser"));
        }
    }, [])
    /* eslint-enable */

    const handleFirstname = (e) => {
        setFirstname(e.target.value);
    }

    const handleLastname = (e) => {
        setLastname(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);   
    }

    const handleComfirmPassword = (e) => {
        setComfirmPassword(e.target.value);
    }

    const handleImageUpload = (e) => {
        setFileName(e.target.files);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(firstname === "" || lastname === "" || password === "" || comfirmPassword === ""){
            alert("All the fields are required");
            e.preventDefault();
        }
        else {
            if (getPassword().match && getUserId().validated) {
                signup({
                    _id: getUserId().id,
                    username: getUsername(),
                    imageURL: getImageURL(),
                    password: getPassword().password
                }, props.history);
            }
            else if (!getPassword().match) {
                alert(getPassword().password);
            }
            else if (!getUserId().validated) {
                alert(getUserId().id);
            }
        }
    }

    const getUserId = () => {
        if (firstname.split(" ").length > 1 || lastname.split(" ").length > 1) {
            return {id: "Name fields must not have any special character",
             validated: false}
        }
        else {
            const id = firstname.toLowerCase().concat(lastname.toLowerCase())
            return {id, validated: true};
        }
    }


    const getUsername = () => {
        return firstname.concat(" ", lastname);
    }

    const getImageURL = () => {
        return file ? file[0].name : "";
    }

    const getPassword = () => {
        return password === comfirmPassword ?
         {password, match: true} :
         {password: "Password and comfirm password do not match", match: false}
    }

    return (
        <>
        <Navigation />
        <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>{props.location.state ? props.location.state.desc : "sign up"}</h3>
                </div>
                <div className="card-body">
                    <form encType="multipart-form-data" onSubmit={handleSubmit.bind(this)}>
                        <div className="sign-up-image input-group form-group"> 
                            <img src="usersAvatar/avatar.png" alt="avatar" />
                        </div>
                        <div className="update">
                            <input type="file" name="myImage" 
                            onChange={handleImageUpload.bind(this)}/>
                        </div>
                        <div className="input-group form-group">
                            <input type="text" onChange={handleFirstname.bind(this)}
                            className="input-control" placeholder="firstname" />
                            <input type="text" onChange={handleLastname.bind(this)}
                            className="input-control" placeholder="lastname" />
                        </div>
                        <div className="input-group form-group">
                            <input type="password" className="input-control" 
                            placeholder="password" onChange={handlePassword.bind(this)} />
                            <input type="password" className="input-control" 
                            placeholder="comfirm password" 
                            onChange={handleComfirmPassword.bind(this)} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Sign Up"
                             className= "btn float-right login_btn" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Already have an account?
                        <Link
                        to={{
                            pathname:'/users/login',
                            state: {desc:'sign in'}
                        }}>
                        Log in</Link>
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
        users: state.users,
        authedUser: state.authedUser
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        dispatch_fetchUsers: () => dispatch(fetchUsers()), 
        dispatch_authedUser: (user) => dispatch(authedUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));