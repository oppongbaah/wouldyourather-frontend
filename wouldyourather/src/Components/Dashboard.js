import {useEffect} from 'react';
import {connect} from 'react-redux';
import Navigation from './NavBar';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {fetchUsers, authedUser} from '../redux/middlewares/mwUsers';
// instantiate cookie
const cookies = new Cookies();

function Dashboard(props) {

  /* eslint-disable */
  useEffect(() => {
    props.dispatch_fetchUsers();
  
    if (cookies.get("authedUser")) {
      props.dispatch_authedUser(cookies.get("authedUser"));
    }
    else {
      props.dispatch_authedUser("guest");
    }
  }, [])
  /* eslint-enable */

  const isCookied = () => {
    return cookies.get('authedUser');
  }

  return(
    <>
      {
        isCookied() &&
          <>
            <Navigation />
            <h2 className="center"> Dashboard </h2>
          </>
      }
      {
        !isCookied() &&
          <>
            <Redirect to={{
              pathname: 'users/login',
              state: {desc: "sign in required", redirected: true}
            }}/>
          </>
      }
      
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
