import React, {useEffect} from 'react';
import Navigation from './NavBar';
import {connect} from 'react-redux';
import {fetchUsers, authedUser} from '../redux/middlewares/mwUsers';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NewTweet = (props) => {
  
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

  return(
    <>
      <Navigation />
      <h2 className="center"> New Poll </h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTweet);
