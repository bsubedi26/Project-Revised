import React from 'react';
import axios from 'axios';

class Scraper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      favoriteMidi: [],
      imgLoaded: false
    };
  }

  componentDidMount() {

  }

  inputChanged(e) {
    var obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
  }
 
  render() {
    var self = this;
    return (

        <div>
          <h1 className="text-center">Welcome to the Scraper Page!</h1>
          <hr />

        </div>

    );
  }
}

export default Scraper;