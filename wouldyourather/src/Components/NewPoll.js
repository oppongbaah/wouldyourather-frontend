import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {authedUser} from '../redux/middlewares/mwUsers';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NewTweet = (props) => {
  


  return(
    <>
      {
        cookies.get("authedUser") &&
        <>
          <h1 className="center"> Would You Rather? </h1>
          <form>
            <div className="form-group">
              <label >Option One</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label >Option Two</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
          </form>
        </>
      }
      {
        !cookies.get("authedUser") &&
        <Redirect to={{
          pathname: '/users/login',
          state: {desc: "sign in required", redirected: true}
        }} />
      }
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch_authedUser: (user) => dispatch(authedUser(user))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(NewTweet));
