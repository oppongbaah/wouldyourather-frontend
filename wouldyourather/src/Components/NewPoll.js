import {Component} from 'react';
import Navigation from './NavBar';

class NewTweet extends Component {

  render() {
    return(
      <>
        <Navigation />
        <h3> Create new poll </h3>
      </>
    )
  }
}

export default NewTweet;
