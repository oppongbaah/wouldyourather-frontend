import React, {useEffect} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../styles/App.css';
import Cookies from 'universal-cookie';
import {IoMdArrowDropdown} from 'react-icons/io';
import {authedUser, fetchUsers} from '../redux/middlewares/mwUsers';
import {fetchPoll} from '../redux/middlewares/mwPolls';

const cookies = new Cookies();

function Navigation(props){

  /* eslint-disable */
  useEffect(() => {
    if(cookies.get("authedUser")) {
      props.dispatch_authedUser(cookies.get("authedUser"));
    }
  }, [])

  useEffect(() => {
    props.dispatch_fetchUsers();
  }, [])

  useEffect(() => {
    props.dispatch_fetchPoll();
  }, [])
  /* eslint-enable */

  const image = props.avatarURL;

  const imageURL = image ? `/usersAvatar/${image}` 
  : '/usersAvatar/avatar.png';
 
  return (
    <>
      <div className="container-nav">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    
        <nav id="navbarSupportedContent" className="navbar navbar-expand-lg navbar-light bg-warning">

          <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto topnav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    exact to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/add">
                    New Poll
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </li>

                <li className="dropd">
                  <div className="nav-item dropdown">  
                    <p className="nav-link dropdown-toggle" 
                      id="navbarDropdown" role="button" data-toggle="dropdown" 
                      aria-haspopup="true" aria-expanded="false">
                        {props.authedUser}<IoMdArrowDropdown />   
                    </p>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <div className="dropdown-divider"></div>
                            <Link className="dropdown-item"
                              to={{
                                pathname:'/users/login',
                                state: {desc:'sign in'}  
                                }}>
                              Sign In
                            </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item"
                          to={{
                            pathname:'/users/signup',
                            state: {desc:'sign up'}  
                            }}>
                          Sign Up
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item"
                          to={{
                            pathname:'/users/logout',
                            state: {desc:'sign out'}  
                            }}>
                          Sign Out
                        </Link>
                    </div>
                  </div>
                </li>
                {
                  cookies.get("authedUser") &&
                    <li className="image" >
                      <img src={imageURL} alt="avatar" />
                    </li>
                }
              </ul>
              <div>
              </div>
          </div>
        </nav>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    authedUser: state.users.authedUser.name,
    avatarURL: state.users.authedUser.url,
    users: state.users.payload.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch_authedUser: (user) => dispatch(authedUser(user)),
    dispatch_fetchUsers: () => dispatch(fetchUsers()),
    dispatch_fetchPoll: () => dispatch(fetchPoll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
