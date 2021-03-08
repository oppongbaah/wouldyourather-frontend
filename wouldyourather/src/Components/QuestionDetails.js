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

  try {

    const question = props.history.location.state.question;

    const users = props.users.length
    ? props.users
    : props.history.location.state.users;

    const {
        author,
        optionOne,
        optionTwo
    } = question;
    
    let image = getImageURL(users, author);
    image = image[0] ? image : 'avatar.png';

    const handleOptAClick = (option) => {
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
        await props.dispatch_vote(question._id, props.authedUser, option);
  
        setBtnBClass("selected");
        setBtnFlag(true);
        setTagB(<MdDone/>);
        
        props.history.push(`/questions/${question._id}/answered`, {
          question,
          users
        });
      }
      catch (err) {console.log(err);}
    }

    const view = () => {
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
            </div>
        </div>
        </>
      )
    }

    return(
      <>
        {
            cookies.get("authedUser") &&
              view()
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