import React, {useState} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addQuestion} from '../redux/middlewares/mwPolls';
import Cookies from 'universal-cookie';
import '../styles/dashboard.css';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";

const cookies = new Cookies();

const NewTweet = (props) => {

  // declare all internal state variables here
  const [optOne, setOptOne] = useState("");
  const [optTwo, setOptTwo] = useState("");
  const [optOneField, validateOptOneField] = useState("");
  const [optTwoField, validateOptTwoField] = useState("");

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: tomato;
  `;
  
  const handleOptionOneText = (e) => {
    setOptOne(e.target.value);
  }

  const handleOptionTwoText = (e) => {
    setOptTwo(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // gather all data here
    const author = props.authedUser;
    const timestamp = Date.now();
    const optionOne = {
      text: optOne,
      votes: []
    }
    const optionTwo = {
      text: optTwo,
      votes: []
    }
    const formData = {
      author,
      timestamp,
      optionOne,
      optionTwo
    }

    // call the middleware function and pass the form data to it
    if(optOne === "") {
      validateOptOneField("invalid");
    }
    if(optTwo === "") {
      validateOptTwoField("invalid");
    }

    if(optTwo !== "" && optTwo !== "") {
      validateOptOneField("valid");
      validateOptTwoField("valid");
      props.dispatch_question(formData);
    }
  }

  return(
    <>
      {
        cookies.get("authedUser") &&
        <>
          <h1 className="center"> Would You Rather? </h1>
          <form onSubmit={handleSubmit.bind(this)}>
            <div className="form-group">
              <label >Option One</label>
              <textarea className="form-control" rows="3"
              placeholder="type here" onChange={handleOptionOneText.bind(this)} >
              </textarea>
            </div>
            <div className="form-group">
              <label >Option Two</label>
              <textarea className="form-control" rows="3"
                placeholder="type here" onChange={handleOptionTwoText.bind(this)}>
              </textarea>
            </div>
            <div className="form-group">
              <input className="btn btn-success active add" type="submit" value="Submit" />
            </div>
          </form>
          {
            props.addingStatus === "adding" &&
              <DotLoader color={"tomato"} loading={true} css={override} size={60} />
          }
          {
            props.addingStatus === "added" &&
              optOneField === "valid" && optTwoField === "valid"
              ?
                <h3 className="adding-message"> {props.addingMessage} </h3>
              :
              optOneField === "invalid" && optTwoField === "invalid" &&
                <h3 className="warning-message"> 
                Please provide a valid text for both option one and two</h3>
          }
          {
            props.addingStatus === "failed" &&
              <h3 className="error-message"> {props.addingMessage} </h3>
          }
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

const mapStateToProps = (state) => {
  return {
    authedUser: state.users.authedUser.name,
    addingStatus: state.polls.addedQuestion.status,
    addingMessage: state.polls.addedQuestion.message,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch_question: (question) => dispatch(addQuestion(question))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewTweet));
