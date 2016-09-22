import React from 'react';
import axios from 'axios';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import EventEmitter from 'events';
// <input id="embedUrl" spellCheck="false" defaultValue />
import once from 'lodash/once';

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      videos: [],
      reloaded: false
    };
  }

  componentWillMount() {

    const script = document.createElement("script");
      script.src = "/js/youtube_search.js";
      script.async = true;
      document.body.appendChild(script);

    const script2 = document.createElement("script");
      script2.src = "https://apis.google.com/js/client.js?onload=gapiInit";
      script2.async = true;
      document.body.appendChild(script2);

  }

  reload() {
    if (localStorage.getItem('reloaded') === "false") {
      localStorage.setItem('reloaded', true)
      window.location.reload()
    };

  }

  componentDidMount() {
    var self = this;
    this.reload();
    
  }

  componentWillUnmount() {
    localStorage.setItem('reloaded', false);      
  }
  inputChanged(e) {
    var obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
    console.log(this.state)
  }
 
 starClicked(e) {
   e.preventDefault()
   axios.get('/api/midi/getFavorites').then( (data) => {
     this.setState(data)
   })

   this.setState({

   })
 }

  render() {
    var self = this;

      return (
      <div id="outerWrapper">
        <link rel="stylesheet" type="text/css" href="/styles/css/youtube-search.css" />
        <div id="wrapper">
          <div className="clearfix well" id="header">
            <input id="searchBox" spellCheck="false" placeholder="Search" />
            <hr />
            <span id="searchTermKeyword"></span>
          </div>
          <div className="clearfix" id="main">
            <div id="videoDiv">
              <div id="innerVideoDiv">
                Loading...
              </div>
              
            </div>
            <div id="playlistWrapper">
              <div className="pauseButton" id="buttonControl">
                <a href="javascript:void(0);">&nbsp;</a>
              </div>
              <div className="clearfix" id="playlist">
                &nbsp;
              </div>
            </div>
          </div>
          <hr />
            <button type="button" className="controlBtns btn btn-default btn-md">
            <span  className="glyphicon glyphicon-step-backward"></span>
            </button>

            <button type="button" className="controlBtns btn btn-default btn-md">
            <span  className="glyphicon glyphicon-stop"></span>
            </button>


            <button type="button" className="controlBtns btn btn-default btn-md">
            <span  className="glyphicon glyphicon-fast-forward"></span>
            </button>

            <button onClick={self.starClicked.bind(self)} type="button" className="controlBtns btn btn-default btn-md">
            <span  className="glyphicon glyphicon-star"></span>
            </button>
          
        </div>
      </div>
      
      )

  }
}

export default Youtube;