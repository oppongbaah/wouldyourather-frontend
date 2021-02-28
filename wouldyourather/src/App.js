import {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/App.css';
// import useLocationBlocker from './LocationBlocker'

// import components using the lazy method from the react library
const Dashboard = lazy(() => import('./Components/Dashboard'));
const PollDetails = lazy(() => import('./Components/PollDetails'));
const NewPoll = lazy(() => import('./Components/NewPoll'));
const Login = lazy(() => import('./Components/Login'));
const Logout = lazy(() => import('./Components/Logout'));
const Signup = lazy(() => import('./Components/Signup'));

class App extends Component {

  render() {
    return (
      <div className="container">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/poll  " component={PollDetails}/>
              <Route path="/new-poll" component={NewPoll}/>
              <Route path="/new-poll" component={NewPoll}/>
              <Route path="/users/login" component={Login}/>
              <Route path="/users/logout" component={Logout}/>
              <Route path="/users/signup" component={Signup}/>
            </Switch>
          </Suspense>
        </Router>
      </div>
    )
  }
}

export default App;