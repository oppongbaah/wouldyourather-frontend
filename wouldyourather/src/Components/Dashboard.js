import {useEffect} from 'react';
import {connect} from 'react-redux';
import Navigation from './NavBar';

import {
  fetchUsers
} from '../redux/middlewares/mwUsers';

function Dashboard(props) {

  const users = props.users;

  useEffect(() => {
    props.dispatch_fetchUsers();
  }, [])
 
  return(
    <>
      {
        parseInt(props.userStatus.status) === 200 &&
          <>
            <Navigation />
            <h2 className="center"> Your Dashboard </h2>
          </>
      }
      {
        parseInt(props.userStatus.status) === 401 &&
          <>
            <h2 className="center"> Login </h2>
          </>
      }
      
    </>
  )
  
}

const mapStateToProps = state => {
  return {
    users: state.users,
    userStatus: state.userStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch_fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
