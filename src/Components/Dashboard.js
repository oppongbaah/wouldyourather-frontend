import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import PollList from './PoollList';
import '../styles/dashboard.css';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import { getBtnStatus, fetchPoll} from '../redux/middlewares/mwPolls';

const cookies = new Cookies();

function Dashboard(props) {

    /* eslint-disable */
    useEffect(() => {
      // props.dispatch_fetchPoll();
      props.dispatch_getBtnStatus("recommended");
      handleRecBtnDispatch();
    }, [])

    useEffect(() => {
      if(props.btnStatus === "answered"){
        handleAnsBtnDispatch();
      }
      else if(props.btnStatus === "unanswered") {
        handleUnansBtnDispatch();
      }
      else if(props.btnStatus === "recommended") {
        handleRecBtnDispatch();
      } 
    }, [props.btnStatus])
    /* eslint-enable */

    const override = css`
      display: block;
      margin: 20% auto;
      border-color: tomato;
      `;

    const [requiredPolls, setPolls] = useState(props.polls);
    const [allBtnClass, setAllbtnClass] = useState('inactive');
    const [ansBtnClass, setAnsbtnClass] = useState('inactive');
    const [unansBtnClass, setUnansbtnClass] = useState('inactive');

    const toggleAllClass = () => {
      allBtnClass === 'active' ?
      setAllbtnClass('inactive') :
      setAllbtnClass('active');
    }

    const toggleAnsClass = () => {
      ansBtnClass === 'active' ?
      setAnsbtnClass('inactive') :
      setAnsbtnClass('active');
    }

    const toggleUnansClass = () => {
      unansBtnClass === 'active' ?
      setUnansbtnClass('inactive') :
      setUnansbtnClass('active')
    }

    const handleAnsBtnDispatch = () => {
      const answeredPolls = props.polls
      .filter(question => question.optionOne.votes.includes(props.authedUser) 
      || question.optionTwo.votes.includes(props.authedUser));

      toggleAnsClass();
      setAllbtnClass('inactive');
      setUnansbtnClass('inactive');
      setPolls(answeredPolls);
    }

    const handleAnsBtnClicked = () => {
      props.dispatch_getBtnStatus("answered");
    }

    const handleUnansBtnDispatch = () => {
      const unansweredPolls = props.polls
      .filter(question => !(question.optionOne.votes.includes(props.authedUser)) 
      && !(question.optionTwo.votes.includes(props.authedUser)));
    
      toggleUnansClass();
      setAllbtnClass('inactive');
      setAnsbtnClass('inactive');
      setPolls(unansweredPolls);
    }

    const handleUnansBtnClick = () => {
      props.dispatch_getBtnStatus("unanswered");
    }
    
    const handleRecBtnDispatch = () => {
      const unansweredPolls = props.polls
      .filter(question => !(question.optionOne.votes.includes(props.authedUser)) 
      && !(question.optionTwo.votes.includes(props.authedUser)));

      toggleAllClass();
      setAnsbtnClass('inactive');
      setUnansbtnClass('inactive');
      setPolls(unansweredPolls);
    }
    
    const handleRecBtnClick = () => {
      props.dispatch_getBtnStatus("recommended");
    }

    const checkAvailability = () => {
      const unansweredPolls = props.polls
      .filter(question => !(question.optionOne.votes.includes(cookies.get("authedUser"))) 
      && !(question.optionTwo.votes.includes(cookies.get("authedUser"))));

      if (!unansweredPolls.length && !requiredPolls.length) {
        return (
          <>
            <br></br><br></br>
            <p> You have no unanswered questions. Thank you! </p>
          </>
        )
      }
      else if (props.btnStatus === "answered") {
        if(requiredPolls.length) {
          return <PollList requiredPolls={requiredPolls} status={props.btnStatus} />
        }
        else {
          return (
            <>
              <br></br><br></br>
              <p> You have not answered any question yet. Thank you! </p>
            </>
          )
        }
      }
      else if (props.btnStatus === "unanswered" && requiredPolls.length) {
        return <PollList requiredPolls={requiredPolls} status={props.btnStatus} /> 
      }
      else if (props.btnStatus === "recommended") {
        if (unansweredPolls.length) {
          return <PollList requiredPolls={requiredPolls} status={props.btnStatus} /> 
        }
        else {
          return (
            <>
              <br></br><br></br>
              <p> No Recommendation. Thank you! </p>
            </>
          )
        }
      }
    }

    return(
      <>
          {
              cookies.get('authedUser') &&
              <>           
                <div className='main-container'>
                  <div className="top-panel">
                    <button onClick={handleRecBtnClick.bind(this)}
                      className={`btn btn-success all ${allBtnClass}`}>
                      Recommended
                    </button>
                    <button onClick={handleUnansBtnClick.bind(this)}
                      className={`btn btn-danger unanswered ${unansBtnClass}`} >
                      Unanswered
                    </button>
                    <button className={`btn btn-primary answered ${ansBtnClass}`}
                      onClick={handleAnsBtnClicked.bind(this)} >
                      Answered
                    </button>
                  </div>
                  {
                    props.pollStatus === "done" && props.userStatus === "done" && props.authUserStatus === "done" &&
                      checkAvailability()
                  }
                  {
                    props.pollStatus === "loading" && props.userStatus ==="loading" && props.authUserStatus !== "done" &&
                      <>
                        <br></br><br></br>
                        <DotLoader color={"tomato"} loading={true} css={override} size={60} />
                      </>
                  }
                  {
                    props.pollStatus === "failed" && props.authUserStatus === "failed" &&
                      <>
                        <br></br><br></br>
                        <p> No Internet Connection </p>
                      </>
                  }
                </div>
              </>
              }
            {
              !cookies.get('authedUser') &&
                <Redirect to={{
                    pathname: '/users/login',
                    state: {desc: "sign in required", redirected: true,
                    prevState: props.history.location.pathname}
              }}/>
          }
      </>
    )
  
}

const mapStateToProps = state => {
  return {
    users: state.users.payload.data,
    userStatus: state.users.payload.status,
    authedUser: state.users.authedUser.name,
    authUserStatus: state.users.authedUser.status,
    polls: state.polls.payload.data,
    pollStatus: state.polls.payload.status,
    btnStatus: state.polls.btnStatus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch_getBtnStatus: (status) => dispatch(getBtnStatus(status)),
    dispatch_fetchPoll: () => dispatch(fetchPoll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
