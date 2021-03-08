import React from 'react';
import {Link} from 'react-router-dom';

const Error404 = () => {

    return(
      <>
        <h1> Page Not Found </h1>
        <Link to={{
          pathname: "/"
        }} >
          Return Home
        </Link>
      </>
    )
}

export default Error404;