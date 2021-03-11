import React, {useEffect} from 'react';
import '../styles/login.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {authedUser} from '../redux/middlewares/mwUsers';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Logout(props) {

    /* eslint-disable */
    useEffect(() => {
        props.dispatch_authedUser("Guest");
    }, [props.dispatch_authedUser])
    /* eslint-enable */
    cookies.remove("authedUser", {path: '/'});

    return(
      <>
        {
            <>
                <h3 className="message"> {props.location.state.message} </h3>
                <NavLink className="login-again" 
                    to={{
                    pathname:'/users/login',
                    state: {desc:'sign out', message: "Thank you. Bye!"}  
                    }}>
                    Login again
                </NavLink>
            </>
        }
      </>
    )
}

const mapDispatchToProps = dispatch => {
    return {  
        dispatch_authedUser: (user) => dispatch(authedUser(user))
    }
}
  
export default connect(null, mapDispatchToProps)(Logout);

