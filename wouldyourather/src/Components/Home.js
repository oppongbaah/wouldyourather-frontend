import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../styles/dashboard.css';

// instantiate cookie
const cookies = new Cookies();

function Home(props) {

    const isCookied = () => {
        return cookies.get('authedUser');
    }

    return(
        <>
            {
                isCookied() &&
                    <Redirect to={{
                        pathname: '/dashboard',
                        state: {desc: "sign in required", redirected: true}
                    }}/>
            }
            {
                !isCookied() &&
                    <Redirect to={{
                        pathname: '/users/login',
                        state: {desc: "sign in required", redirected: true,
                        prevPath: props.history.location.pathname}
                    }}/>
            }
        </>
    )
  
}

export default withRouter(Home);
