import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {getImageURL, getUsername, getUserId} from '../helpers/global';
import Cookies from 'universal-cookie';
import '../styles/dashboard.css';
import PieChart from './PieChart';
import {FaThumbsUp, FaRegThumbsUp} from 'react-icons/fa';
import {BsQuestionDiamondFill} from 'react-icons/bs';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";

const cookies = new Cookies();

const override = css`
display: block;
margin: 20% auto;
border-color: tomato;
`;

const Results = (props) => {

    /* eslint-disable */
    useEffect(() => {
      getYourVoteStatus();
    }, [])

    useEffect(() => {
      getYourVoteStatus();
    }, [props.voteStatus])
    /* eslint-enable */

    const [optOne, setOptOne] = useState("");
    const [optTwo, setOptTwo] = useState("");
    const [optOneClass, setOptOneClass] = useState("norm");
    const [optTwoClass, setOptTwoClass] = useState("norm");
    const [optOneIcon, setoptOneIcon] = useState(<FaRegThumbsUp />);
    const [optTwoIcon, setoptTwoIcon] = useState(<FaRegThumbsUp />);
    let users = null, originalQuestion = null;

    const applyStyles = (question) => {
      if(props.voteStatus !== "voting") {
        if (question.optionOne.votes.includes(cookies.get("authedUser"))) {
          setOptOne(`@${cookies.get("authedUser")} including [you]`);
          setoptOneIcon(<FaThumbsUp />);
          setOptOneClass("sltd");
        }
        else if(question.optionTwo.votes.includes(cookies.get("authedUser"))) {
          setOptTwo(`@${cookies.get("authedUser")} including [you]`);
          setOptTwoClass("sltd");
          setoptTwoIcon(<FaThumbsUp />);
        }
        else {
          setOptOne("");
          setOptTwo("");
          setOptOneClass("norm");
          setOptTwoClass("norm");
          setoptOneIcon(<FaRegThumbsUp />);
          setoptTwoIcon(<FaRegThumbsUp />);
        }
      }
    }

    const getYourVoteStatus = () => {

      if (props.history.action === "PUSH" && props.history.location.state) {
        // usual navigation
        const question = props.voteStatus === "voted" 
        ? props.votedQuestion : props.history.location.state.question;
        applyStyles(question);
      }
      else if (props.history.action === "POP" && props.history.location.state) {
        // refresh navigation
        const question = props.voteStatus === "voted" 
        ? props.votedQuestion : props.history.location.state.question;
        applyStyles(question);
      }
    }

    try {
      const getTotalVotes = (question) => {
        let optOneVotes = question.optionOne.votes.length;
        let optTwoVotes = question.optionTwo.votes.length;
        let totalVotes = optOneVotes + optTwoVotes;
        return totalVotes;
      }
  
      const getOptOneVotes = (question) => {
        let votes = question.optionOne.votes.length ;
        let totalVotes = getTotalVotes(question);
        let percentVote = (votes / totalVotes) * 100;
        return [votes, Math.round(percentVote)];
      }
      
      const getOptTwoVotes = (question) => {
        let votes = question.optionTwo.votes.length ;
        let totalVotes = getTotalVotes(question);
        let percentVote = (votes / totalVotes) * 100;
        return [votes, Math.round(percentVote)];
      }
  
      const returnRedirect = () => {
  
        return (
          <Redirect to={{
            pathname: '/users/login',
            state: {desc: "sign in required", redirected: true, 
              questionPath: props.history.location.pathname}
          }} />
        )
      }
  
      const voteView = (question) => {
  
        return (
          <>
            <h4> <BsQuestionDiamondFill /> {question.optionOne.text}</h4>
            <p className={optOneClass}> {optOneIcon}
              {` 
                ${getOptOneVotes(question)[0]} voted this
                ${optOne}
              `}
            </p>
            <h4> <BsQuestionDiamondFill /> {question.optionTwo.text}</h4>
            <p className={optTwoClass}> {optTwoIcon}
              {`
                ${getOptTwoVotes(question)[0]} voted this
                ${optTwo}
              `}
            </p>
            <PieChart 
              opt1={{text:`${question.optionOne.text}`, size:getOptOneVotes(question)[1]}}
              opt2={{text:`${question.optionTwo.text}`, size:getOptTwoVotes(question)[1]}}
              desc={"Statistical Analysis"} 
            />
          </>
        )
      }
  
      const preview = (dateTime) => {
        return (
          <div className="date-time">
            <span>{new Date(dateTime).toLocaleString('en-US',
              { hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true }
            )}</span> |
            <span> {new Date(dateTime).getDate()}</span>/
            <span>{new Date(dateTime).getMonth()}</span>/
            <span>{new Date(dateTime).getFullYear()}</span>
          </div>
        )
      }
  
      const view = () => {
  
        users = props.history.location.state.users
        originalQuestion = props.history.location.state.question
  
        const {author,timestamp} = originalQuestion;
      
        let dateTime = parseInt(timestamp);
        let image = getImageURL(users, author);
        image = image[0] ? image : 'avatar.png';
        let username = getUsername(props.users, author);
  
        return (
          <>
            <div className="poll">
              <div className="avatar">
                  <img src={`/usersAvatar/${image}`} alt="profile" />
              </div>
              <div className="poll-info">
                <div>
                  <span> {username} </span>
                  {preview(dateTime)}
                  <div className="asked-by">
                      <span> asked by @{getUserId(props.users, author)} </span>
                  </div>
                  <div className="question">                   
                  </div>
                  <div className="chart">
                    {
                      props.voteStatus === "voted" &&
                        voteView(props.votedQuestion)
                    }
                    {
                      props.voteStatus === "voting" &&
                        <DotLoader color={"tomato"} loading={true} css={override} size={60} />
                    }
                    {
                      props.voteStatus === "" &&
                      voteView(props.history.location.state.question)
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
  
      return(
        <>
          {
            cookies.get("authedUser") &&
              props.history.action === "PUSH" && props.history.location.state ?
              // usual navigation
                view()
              :
              props.history.action === "POP" && props.history.location.state.prevPath === "/dashboard" ?
              // refresh with path from the dashboard
                view()
              :
              props.history.action === "POP" && props.history.location.state.prevPath !== "/dashboard" ?
              // refresh with path from the question detail page
                <Redirect to="/" />
              :
              // entered url directly
                returnRedirect()
          }
          {
            !cookies.get("authedUser") &&
                <Redirect to={{
                    pathname: '/users/login',
                    state: {desc: "sign in required", redirected: true,
                    directPath: props.history.location.pathname}
                }} />
          }
        </>
      )
    }
    catch(e) {
      console.log(e)
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.payload.data,
        authedUser: state.users.authedUser.name,
        polls: state.polls.payload.data,
        votedQuestion: state.polls.vote.data,
        voteStatus: state.polls.vote.status,
    }
}

export default connect(mapStateToProps)(withRouter(Results));