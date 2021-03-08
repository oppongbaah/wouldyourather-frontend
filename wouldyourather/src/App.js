import {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/App.css';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import Navigation from './Components/NavBar';

// import components using the lazy method from the react library
const Home = lazy(() => import('./Components/Home'));
const Dashboard = lazy(() => import('./Components/Dashboard'));
const NewPoll = lazy(() => import('./Components/NewPoll'));
const Leaderboard = lazy(() => import('./Components/Leaderboard'));
const Login = lazy(() => import('./Components/Login'));
const Logout = lazy(() => import('./Components/Logout'));
const Signup = lazy(() => import('./Components/Signup'));
const QuestionDetails = lazy(() => import('./Components/QuestionDetails'));
const Results = lazy(() => import('./Components/Results'));
const Error404 = lazy(() => import('./Components/404Error'));

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
display: block;
margin: 20% auto;
border-color: tomato;
`;

class App extends Component {

  render() {
    return (
      <div className="container">
        <Router>
        <Navigation />
          <Suspense fallback={<DotLoader color={"tomato"} loading={true} css={override} size={60} />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/add" component={NewPoll}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/users/login" component={Login}/>
              <Route path="/users/logout" component={Logout}/>
              <Route path="/users/signup" component={Signup}/>
              <Route path="/questions/:id/unanswered" component={QuestionDetails} />
              <Route path="/questions/:id/recommended" component={QuestionDetails} />
              <Route path="/questions/:id/answered" component={Results} />
              <Route component={Error404} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    )
  }
}

export default App;