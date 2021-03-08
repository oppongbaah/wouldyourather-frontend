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

    const originalQuestion = props.history.location.state.question

    const users = props.users.length
    ? props.users
    : props.history.location.state.users;

    const {
        author,
        timestamp,
        optionOne,
        optionTwo
    } = originalQuestion;
    
    let dateTime = parseInt(timestamp);
    let image = getImageURL(users, author);
    image = image[0] ? image : 'avatar.png';
    let username = getUsername(props.users, author);

    const getYourVoteStatus = () => {

      const question = props.voteStatus === "voted" 
      ? props.votedQuestion : originalQuestion;

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
      if(props.voteStatus === "" && props.history.action === "POP") {
        props.history.push('/');
      }
    }

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

    const view = (question) => {
      return (
        <>
          <h4> <BsQuestionDiamondFill /> {optionOne.text}</h4>
          <p className={optOneClass}> {optOneIcon}
            {` 
              ${getOptOneVotes(question)[0]} voted this
              ${optOne}
            `}
          </p>
          <h4> <BsQuestionDiamondFill /> {optionTwo.text}</h4>
          <p className={optTwoClass}> {optTwoIcon}
            {`
              ${getOptTwoVotes(question)[0]} voted this
              ${optTwo}
            `}
          </p>
          <PieChart 
            opt1={{text:`${optionOne.text}`, size:getOptOneVotes(question)[1]}}
            opt2={{text:`${optionTwo.text}`, size:getOptTwoVotes(question)[1]}}
            desc={"Statistical Analysis"} 
          />
        </>
      )
    }

    return(
      <>
        {
            cookies.get("authedUser") &&
            <>
            <div className="poll">
              <div className="avatar">
                  <img src={`/usersAvatar/${image}`} alt="profile" />
              </div>
              <div className="poll-info">
                <div>
                  <span> {username} </span>
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
                  <div className="asked-by">
                      <span> asked by @{getUserId(props.users, author)} </span>
                  </div>
                  <div className="question">                   
                  </div>
                  <div className="chart">
                    {
                      props.voteStatus === "voted" &&
                        view(props.votedQuestion)
                    }
                    {
                      props.voteStatus === "voting" &&
                        <DotLoader color={"tomato"} loading={true} css={override} size={60} />
                    }
                    {
                      props.voteStatus === "" &&
                        view(originalQuestion)
                    }
                  </div>
                </div>
              </div>
            </div>
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