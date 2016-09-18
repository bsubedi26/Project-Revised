import React from 'react';
import axios from 'axios';
import {isEmpty} from'lodash';
import Player from './Player.js';
import { connect } from 'react-redux';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class MidiArchives extends React.Component {
  
  constructor(props) {
    super(props)
    this.state =  {
      contemporary: [],
      games: [],
      movies: [],
      anthems: [],
      blues: [],
      jazz: [],
      gospel: [],
      classical: [],
      input: "",
      tab: "",
      playing: "",
      tmp: []
    }
  }

  componentDidMount() {
    var self = this;

      // jQuery click function for setting the active tab currently selected
      $('ul.nav-tabs > li').click(function (e) {
          e.preventDefault();
          $('ul.nav > li').removeClass('active');
          $(this).addClass('active'); 
          var activeTab = $(this).text().toLowerCase();
          // set the active tab as state
          self.setState({
            tab: activeTab
          })
          
      });
    
  }

  componentWillUnmount() {
    var self = this;
    const {userInfo} = this.props;
    var username = userInfo.user.username;
    
  }

  getDynamic(e) {
    var self = this;
    e.preventDefault();
    var name = e.target.innerHTML.toLowerCase();
    console.log(name)

    axios.get('/api/midi/folder/'+name).then(function(data) {
      var midiNames = data.data[0];
      self.setState({
          [name]: midiNames,
          tmp: midiNames
      })
    })

  }

  search(genre, input) {
    var self = this;
    var searchMatches = [];
    
    switch(self.state.tab) {
      case(genre):
        self.state.tmp.forEach(function(word,i) {
          if (word.toLowerCase().indexOf(input) === 0) {
            searchMatches.push(word)
          }
        })
        self.setState({
          [genre]: searchMatches
        })


    }
  }

  inputChanged(event) {
    var self = this;
    var searchMatches = [];
    console.log(self.state)
    self.search(self.state.tab, event.target.value.toLowerCase())

  }
            
  play(e) {
    var self = this;
    e.preventDefault();

    // Get the name of the midi file to play
    var name = e.target.getAttribute('data-name');
    // Get the index where the extension .mid starts 
    var index = name.indexOf('.');
    // Slice extension file name .mid
    var realName = name.slice(0, index);
    //Replace all _ & - with spaces
    realName = realName.replace(/_/g, ' ');
    realName = realName.replace(/-/g, ': ');
    //Set the state of the new file name that's playing 
    self.setState({
      playing: realName
    })
    // Path to the midi file to play it
    var activeTab = self.state.tab;
    var rootDir = '/midi/';
    MIDIjs.play(rootDir+activeTab+'/'+name);
  }

  stop(e) {
    e.preventDefault();
    MIDIjs.stop();
  }

  render() {
   var self = this;

   function selectCategory(arr) {
   return arr.map((midi,i) => {
      //Remove .mid extension
      var midiRealName = midi.slice(0, midi.indexOf('.'))
      //Replace all _ with spaces
      midiRealName = midiRealName.replace(/_/g, ' ');
      midiRealName = midiRealName.replace(/-/g, ': ');

      return (
        <div key={i} className="card col-md-6">
        <div key={i} className="card-block well">
          <h2 key={i}>{midiRealName}</h2>

            <button data-name={midi} onClick={self.play.bind(self)} type="button" className="controlBtns btn btn-default btn-md">
            <span data-name={midi} className="glyphicon glyphicon-play"></span>
            </button>
            
            <button data-name={midi} onClick={self.stop.bind(self)} type="button" className="controlBtns btn btn-default btn-md">
            <span data-name={midi} className="glyphicon glyphicon-stop"></span>
            </button>

            <a href={'/midi/'+self.state.tab+'/'+midi}> <button data-name={midi} type="button" className="controlBtns btn btn-default btn-md">
            <span data-name={midi} className="glyphicon glyphicon-download-alt"></span>
            </button></a>
          
        </div>
        </div>
      )
    })
   }
    return (

        <div>
          
          <h1 className="text-center">Midi Archives Page</h1>
         
          <hr />
           <input placeholder="Quick Search" type="text" onChange={this.inputChanged.bind(this)} className="form-control" id="input" />
          <hr />

            <ul className="nav nav-tabs">
                <li className="nav-item active">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Contemporary</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Games</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Movies</a>
                </li>
                 <li className="nav-item">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Anthems</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Blues</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Jazz</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Gospel</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getDynamic.bind(this)} href="#">Classical</a>
                </li>
            </ul>

            <div>

              <If condition={ self.state.tab === 'contemporary' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.contemporary)}
                </ReactCSSTransitionGroup>
              </If>

              <If condition={ self.state.tab === 'games' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.games)}
                </ReactCSSTransitionGroup>
              </If>

              <If condition={ self.state.tab === 'movies' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.movies)}
                </ReactCSSTransitionGroup>
              </If>

              <If condition={ self.state.tab === 'anthems' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.anthems)}
                </ReactCSSTransitionGroup>
            </If>

              <If condition={ self.state.tab === 'blues' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.blues)}
                </ReactCSSTransitionGroup>
              </If>

              <If condition={ self.state.tab === 'jazz' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.jazz)}
                </ReactCSSTransitionGroup>
              </If>

              <If condition={ self.state.tab === 'gospel' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.gospel)}
                </ReactCSSTransitionGroup>
              </If>

              <If condition={ self.state.tab === 'classical' }>
                <ReactCSSTransitionGroup
                  transitionName="fade" 
                  transitionEnterTimeout={1000} 
                  transitionLeaveTimeout={2000}>
                    {selectCategory(self.state.classical)}
                </ReactCSSTransitionGroup>
            </If>

            </div>
              
            <div className="footer navbar-fixed-bottom">
              <Player playing={self.state.playing}/>
            </div>
        </div>

      
    );
  }
}

MidiArchives.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth
  }
}

export default connect(mapStateToProps)(MidiArchives);
