import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {fetchUsers} from '../redux/middlewares/mwUsers';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";

const cookies = new Cookies();

const Leaderboard = (props) => {

  /* eslint-disable */
  useEffect(() => {
    props.dispatch_fetchUsers();
  }, [])
  /* eslint-enable */

  const users = props.users;

  const override = css`
  display: block;
  margin: 20% auto;
  border-color: tomato;
  `;

  // sort users based on the sum of the number of questions asked and answered
  const sortUsers = (orginalUsers) => {
    const sortedPolls = orginalUsers.map(user => user).sort((x, y) =>
        (x.questions.length + x.answers.length) <
        (y.questions.length + y.answers.length) ? 
        1 : -1);
    return sortedPolls;
  }  

  const preview = () => {
    return (
      sortUsers(users).map(user => (
        <li key={user._id}>
          <div className="poll">
            <h4> {sortUsers(users).indexOf(user)+1} </h4>
            <div className="avatar">
              <img src={`/usersAvatar/${user.imageURL?user.imageURL:'avatar.png'}`}
              alt="profile" />
            </div>
            <div className="poll-info">
              <div>
                <span> {user.username} </span>
              </div>
              <p> {`${user.questions.length} questions asked`} </p>
              <p> {`${user.answers.length} questions answered`} </p>
            </div>
          </div>
        </li>
      ))
    )
  }

  const view = () => {

    return (
      <ol>
        {
            props.history.action === "PUSH" && props.history.location.state ?
              preview()
            :
            props.history.action === "POP" && props.history.location.state ?
              preview()
            :
            <Redirect to={{
              pathname: '/users/login',
              state: {desc: "sign in required", redirected: true, 
              prevPath: props.history.location.pathname}
            }} />
        }
      </ol>
    )
  }

  return(
    <>
      {
        cookies.get("authedUser") &&
          props.userStatus === "done" 
          ?
            view()
          :
          <DotLoader color={"tomato"} loading={true} css={override} size={60} />
      }
      {
        !cookies.get("authedUser") &&
          <Redirect to={{
            pathname: '/users/login',
            state: {desc: "sign in required", redirected: true, 
            prevState: props.history.location.pathname}
          }} />
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users.payload.data,
    userStatus: state.users.payload.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch_fetchUsers: () => dispatch(fetchUsers())
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Leaderboard));
