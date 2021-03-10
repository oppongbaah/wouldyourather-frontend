import React from 'react';
import Poll from './Poll';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

function PollList(props) {
  const polls = !props.requiredPolls.length ? props.polls : props.requiredPolls;

  const handleViewBtnClick = (question) => {
    props.history.push(`/questions/${question._id}/${props.status}`, {
      question,
      users: props.users,
      prevPath: props.history.location.pathname
    });
  }

  const viewRecommended = () => {
    let unansweredPolls;
    if(!props.requiredPolls.length) {
      unansweredPolls = props.polls
      .filter(question => !(question.optionOne.votes.includes(props.authedUser)) 
      && !(question.optionTwo.votes.includes(props.authedUser)));
    }
    else {
      unansweredPolls = polls;
    }
    
    const i = Math.floor(Math.random() * unansweredPolls.length);
    
    const recommendedPoll = unansweredPolls[i];
    
    return (
      <li  >
        <Poll question={recommendedPoll} viewClicked={handleViewBtnClick} />
      </li>
    )
  }

  const viewOther = () => {
    return (
      <ul>
      {
        polls
        .map(question => (
          <li key={question._id} >
            <Poll question={question} viewClicked={handleViewBtnClick} />
          </li>
      ))
      }
      </ul>
    )
  }

  return (
    <>
      {
        props.status !== "recommended" &&
        viewOther()
      }
      {
        props.status === "recommended" &&
        viewRecommended()
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    polls: state.polls.payload.data,
    users: state.users.payload.data,
    authedUser: state.users.authedUser.name
  }
}

export default connect(mapStateToProps)(withRouter(PollList));