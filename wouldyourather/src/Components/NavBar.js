import React from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import '../styles/App.css';
import Cookies from 'universal-cookie';
import {IoMdArrowDropdown} from 'react-icons/io';

const cookies = new Cookies();

function Navigation(props){

  const logout = (e) => {
    if (cookies.get("authedUser")) {
      cookies.remove("authedUser", {path: "/"})
    }
    else {
      return <Redirect to='/users/login' />
    }
    
  }

  const getImageURL = (userId) => {
    return props.users
    .filter(user => user._id === userId && user.imageURL)
    .map(user => user.imageURL)
  }

  const image = getImageURL(props.authedUser);

  const imageURL = image.length ? `usersAvatar/${image}` 
  : 'usersAvatar/avatar.png';
 
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
                    exact to="/">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/new-poll">
                    New Poll
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
                            pathname:'/users/signup',
                            state: {desc:'sign up'}  
                            }}>
                          Sign Up
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
                <li className="nav-item signin">
                  <>
                    <NavLink className="nav-link btn btn-primary text-white" activeClassName="active"
                     to={{
                      pathname:'/users/login',
                      state: {desc:'sign in'}
                    }}>
                       Login</NavLink>
                  </>       
                </li>
                <li className="nav-item signout">
                    <NavLink className="nav-link btn btn-danger text-white" 
                      to={{
                      pathname:'/users/logout',
                      state: {desc:'sign out', message: "Thank you for your time. Bye!"}  
                      }} onClick={logout.bind(this)}>
                        Logout
                    </NavLink>
                </li>
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
    authedUser: state.authedUser,
    users: state.users
  }
}

export default connect(mapStateToProps)(Navigation);
