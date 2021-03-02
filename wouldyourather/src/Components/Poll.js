import React from 'react';

function Poll(props) {
  const {
    author,
    timestamp,
    optionOne,
    optionTwo
  } = props.question;

  let dateTime = parseInt(timestamp);
  
  return (
  <div className="poll">
    <div className="poll-info">
      <div>
        <span> {props.author} </span>
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
        <p> Would You Rather? </p>
        <button> {optionOne.text} </button> 
        <br></br>
        <button> {optionOne.text} </button>
      </div>
    </div>
  </div>
)
}

export default Poll;