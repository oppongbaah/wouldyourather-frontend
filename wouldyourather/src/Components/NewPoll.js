import React, {useEffect} from 'react';
import Navigation from './NavBar';
import {connect} from 'react-redux';
import {authedUser} from '../redux/middlewares/mwUsers';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NewTweet = (props) => {
  
  /* eslint-disable */
  useEffect(() => {
    if(cookies.get("authedUser")) {
      props.dispatch_authedUser(cookies.get("authedUser"));
    }
  }, [])
  /* eslint-enable */

  return(
    <>
      <Navigation />
      <h2 className="center"> New Poll </h2>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch_authedUser: (user) => dispatch(authedUser(user))
  }
}

export default connect(null, mapDispatchToProps)(NewTweet);
