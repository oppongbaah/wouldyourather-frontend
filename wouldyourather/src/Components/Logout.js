import React, {useEffect} from 'react';
import Navigation from './NavBar';
import '../styles/login.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUsers, authedUser} from '../redux/middlewares/mwUsers';

function Logout(props) {

    /* eslint-disable */
    useEffect(() => {
        props.dispatch_fetchUsers();
        props.dispatch_authedUser("Guest");
    }, [])
    /* eslint-enable */

    return(
      <>
        <Navigation  logout={true}/>
        <h3 className="message"> {props.location.state.message} </h3>
        <NavLink className="login-again" 
            to={{
            pathname:'/users/login',
            state: {desc:'sign out', message: "Thank you. Bye!"}  
            }}>
            Login again
        </NavLink>
      </>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users,
        authedUser: state.autherUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch_fetchUsers: () => dispatch(fetchUsers()),  
        dispatch_authedUser: (user) => dispatch(authedUser(user))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Logout);

