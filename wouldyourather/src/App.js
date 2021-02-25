import {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/App.css';
// import useLocationBlocker from './LocationBlocker'

// import components using the lazy method from the react library
const Dashboard = lazy(() => import('./Components/Dashboard'));
const PollDetails = lazy(() => import('./Components/PollDetails'));
const NewPoll = lazy(() => import('./Components/NewPoll'));

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
            </Switch>
          </Suspense>
        </Router>
      </div>
    )
  }
}

export default App;