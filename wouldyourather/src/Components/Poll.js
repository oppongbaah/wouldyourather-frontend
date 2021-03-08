import React from 'react';
import {connect} from 'react-redux';
import {getImageURL, getUsername, getUserId} from '../helpers/global';
import {BsQuestionDiamondFill} from 'react-icons/bs';

function Poll(props) {
  const {
    author,
    timestamp,
    optionOne
  } = props.question


  let dateTime = parseInt(timestamp);
  let image = getImageURL(props.users, author);
  image = image[0] ? image : 'avatar.png';
  let username = getUsername(props.users, author);
  
  return (
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
          <div className="replying-to">
                <span> asked by @{getUserId(props.users, author)} </span>
          </div>
          <p> Would You Rather? </p>
          <p className="option-one"> <BsQuestionDiamondFill /> {optionOne.text} ... </p> 
          <br></br>
          <button className="view btn btn-info" 
            onClick={props.viewClicked.bind(this, props.question)}>
            View 
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users.payload.data,
    authedUser: state.users.authedUser.name
  }
}

export default connect(mapStateToProps)(Poll);