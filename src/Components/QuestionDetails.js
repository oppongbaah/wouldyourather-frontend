import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {getImageURL, getUserId} from '../helpers/global';
import {vote, fetchPoll} from '../redux/middlewares/mwPolls';
import Cookies from 'universal-cookie';
import '../styles/dashboard.css';
import {MdDone} from 'react-icons/md';

const cookies = new Cookies();

const QuestionDetails = (props) => {

  /* eslint-disable */
  useEffect(() => {
    props.dispatch_fetchPoll();
  }, [props.voteStatus])
  /* eslint-enable */

  const [btnAClass, setBtnAClass] = useState("");
  const [btnBClass, setBtnBClass] = useState("");
  const [btnFlag, setBtnFlag] = useState(false);
  const [tagA, setTagA] = useState("A");
  const [tagB, setTagB] = useState("B");

  let question = null, users = null; 

  try {
    const handleOptAClick = (option) => {
      users = props.history.location.users
      question = props.history.location.state.question

      props.dispatch_vote(question._id, props.authedUser, option);

      setBtnAClass("selected");
      setBtnFlag(true);
      setTagA(<MdDone/>)

      props.history.push(`/questions/${question._id}/answered`, {
        question,
        users
      });
    }

    props.history.listen((location, action) => {
      if (action === "POP") {
        props.history.push('/');
      }
    })
    
    const handleOptBClick = async (option) => {
      try {
        users = props.history.location.state.users
        question = props.history.location.state.question

        await props.dispatch_vote(question._id, props.authedUser, option);
  
        setBtnBClass("selected");
        setBtnFlag(true);
        setTagB(<MdDone/>);
        
        props.history.push(`/questions/${question._id}/answered`, {
          question,
          users,
          prevPath: props.history.location.pathname
        });
      }
      catch (err) {console.log(err);}
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

    const viewQuestion = (optionOne,optionTwo) => {

      return (
        <div className="question">
          <h2> Would You Rather? </h2>
          <div className="option-btn">
              <div> <p> {tagA} </p> </div>
              <button className={`btn btn-primary active ${btnAClass}`} 
                disabled={btnFlag}
                onClick={handleOptAClick.bind(this, "optionOne")} >
                {optionOne.text}
              </button>
          </div>
          <div className="option-btn">
              <div> <p> {tagB} </p> </div>
              <button className={`btn btn-primary active ${btnBClass}`}
                disabled={btnFlag}
                onClick={handleOptBClick.bind(this, "optionTwo")} >
                {optionTwo.text}
              </button>
          </div>
        </div>
      )
    }

    const view = () => {
      users = props.history.location.state.users
      question = props.history.location.state.question

      const {author,optionOne,optionTwo} = question;

      let image = getImageURL(users, author);
      image = image[0] ? image : 'avatar.png';


      return (
        <>
        <div className="poll">
            <div className="avatar">
                <img src={`/usersAvatar/${image}`} alt="profile" />
            </div>
            <div className="poll-info">
                <div className="asked-by">
                    <span> asked by @{getUserId(props.users, author)} </span>
                </div>
                {viewQuestion(optionOne,optionTwo)}
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
              view()
            :
            props.history.action === "POP" && props.history.location.state ?
              view()
            :
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
  catch(err){
    console.log(err);
    return <Redirect to="/page-not-found-return-home" />
  }
}

const mapStateToProps = state => {
    return {
        users: state.users.payload.data,
        authedUser: state.users.authedUser.name,
        polls: state.polls.payload.data,
        voteStatus: state.polls.vote.status,
        votedQuestion: state.polls.vote.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch_fetchPoll: () => dispatch(fetchPoll()),
      dispatch_vote: (pid, uid, option) => dispatch(vote(pid, uid, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuestionDetails));