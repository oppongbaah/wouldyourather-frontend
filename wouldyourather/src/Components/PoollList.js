import React from 'react';
import Poll from './Poll';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function pollList(props) {
  const polls = props.polls;

  return (
    <Link to="">
      <ul>
        {
          polls.map(question => (
            <li key={question._id}>
              <Poll question={question}/>
            </li>
        ))
        }
      </ul>
    </Link>
  )
}

const mapStateToProps = state => {
  return {
    polls: state.polls.data,
  }
}

export default connect(mapStateToProps)(pollList);
