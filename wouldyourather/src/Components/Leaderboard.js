import React from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Leaderboard = (props) => {

  return(
    <>
      {
        cookies.get("authedUser") &&
        <>
          <h2 className="center"> Leaderboard </h2>
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


export default Leaderboard;
