import React from 'react';
import axios from 'axios';
import {isEmpty} from'lodash';
import Player from './Player.js';
import { connect } from 'react-redux';

class MidiArchives extends React.Component {
  
  constructor(props) {
    super(props)
    this.state =  {
      midiContemporaryNames: [],
      midiGameNames: [],
      midiMovieNames: [],
      midiAnthemNames: [],
      favorites: [],
      midiLoaded: false,
      input: "",
      tab: "",
      playing: ""
    }
  }

  componentDidMount() {
    var self = this;
 
    $(document).ready(function () {
        $('ul.nav-tabs > li').click(function (e) {
            e.preventDefault();
            $('ul.nav > li').removeClass('active');
            $(this).addClass('active'); 

            var activeTab = $(this).text().toLowerCase();
            console.log(activeTab)
            // set the active tab as state
            self.setState({
              tab: activeTab
            })               
        });            
    });
    
  }

  componentWillUnmount() {
    var self = this;
    const {userInfo} = this.props;
    var username = userInfo.user.username;
    axios.post('/api/midi/addFavorites', {
      user: username,
      favorites: self.state.favorites
    }).then(function() {
      console.log('axios .then triggered')
    })
  }

  getContemporary() {
  var self = this;
    axios.get('/api/midi/contemporary').then(function(data) {
        var midiNames = data.data[0];
        self.setState({
            midiContemporaryNames: midiNames
        })
      // var newMidiNames = self.state.midiNames.concat([], midiNames); 
      // self.setState({midiNames: newMidiNames});
    })
  }

  getGames() {
     var self = this;
    //  console.log(this.state);
     axios.get('/api/midi/games').then(function(data) {
      var gameNames = data.data[0];

      self.setState({
        midiGameNames: gameNames
      })

      // Replace midiNames state with new array data
      // self.setState({midiGameNames: self.state.midiGameNames.map(function(value,i) {
      //     return gameNames[i]
      // })});
    
    })
  }

  getMovies() {
     var self = this;
     console.log(this.state);
     axios.get('/api/midi/movies').then(function(data) {
      var movieNames = data.data[0];

      // Replace midiNames state with new array data
      self.setState({
        midiMovieNames: movieNames
      });
    
    })
  }

  getAnthems() {
     var self = this;
     axios.get('/api/midi/anthems').then(function(data) {
      var anthemNames = data.data[0];

      // Replace midiNames state with new array data
      self.setState({
        midiAnthemNames: anthemNames
      });
    
    })
  }

  play(e) {
    var self = this;
    e.preventDefault();
    var prom = new Promise(function(resolve, reject) {
      // Get the name of the midi file to play
      var name = e.target.getAttribute('data-name');
      if (name) {
        console.log(name)
        resolve(name)
      }
      else {
        reject(Error("Error: Cannot play midi"))
      }
      
    })

    prom.then(function(name) {

      var index = name.indexOf('.');
      console.log(index)

      var realName = name.slice(0, index);
      //Replace all _ & - with spaces
      realName = realName.replace(/_/g, ' ');
      realName = realName.replace(/-/g, ': ');
      
      self.setState({
        playing: realName
      })
      console.log(self.state)

      // Get the active nav tab to pass it into the url
      // var activeTab = $('body').find('.active').text().toLowerCase();
      var activeTab = self.state.tab;
      console.log(activeTab)
      var rootDir = '/midi/';
      MIDIjs.play(rootDir+activeTab+'/'+name);
    })

  }

  stop(e) {
    e.preventDefault();
    // var name = e.target.getAttribute('data-name');
    MIDIjs.stop();
  }

  download(e) {
    e.preventDefault();
    var name = e.target.getAttribute('data-name');
    console.log(name);
  }

  favorite(e) {
    var self = this;
    e.preventDefault();
    var name = e.target.getAttribute('data-name');
    console.log(name);
    self.state.favorites.push(name);
  }

  inputChanged(event) {
    var self = this;
    var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
    	console.log(this.state);
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
            <span className="glyphicon glyphicon-play"></span>
            </button>
            
            <button data-name={midi} onClick={self.stop.bind(self)} type="button" className="controlBtns btn btn-default btn-md">
            <span className="glyphicon glyphicon-stop"></span>
            </button>

            <a href={'/midi/'+self.state.tab+'/'+midi}> <button data-name={midi} type="button" className="controlBtns btn btn-default btn-md">
            <span className="glyphicon glyphicon-download-alt"></span>
            </button></a>

            <button data-name={midiRealName} onClick={self.favorite.bind(self)} type="button" className="controlBtns btn btn-default btn-md">
            <span className="glyphicon glyphicon-star"></span>
            </button>
          
        </div>
        </div>
      )
    })
   }
    return (

        <div>
          
          <h1 className="text-center">Midi Archives Page</h1>
         
          <hr />
           <input placeholder="Search Archive" type="text" onChange={this.inputChanged.bind(this)} className="form-control" id="input" />
          <hr />

            <ul className="nav nav-tabs">
                <li className="nav-item active">
                    <a className="nav-link" onClick={this.getContemporary.bind(this)} href="#">Contemporary</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getGames.bind(this)} href="#">Games</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.getMovies.bind(this)} href="#">Movies</a>
                </li>
                 <li className="nav-item">
                    <a className="nav-link" onClick={this.getAnthems.bind(this)} href="#">Anthems</a>
                </li>
            </ul>
            <div>
              <If condition={ self.state.tab === 'contemporary' }>
                  {selectCategory(self.state.midiContemporaryNames)}
              </If>
              
              <If condition={ self.state.tab === 'games' }>
                  {selectCategory(self.state.midiGameNames)}
              </If>

              <If condition={ self.state.tab === 'movies' }>
                  {selectCategory(self.state.midiMovieNames)}
              </If>

              <If condition={ self.state.tab === 'anthems' }>
                  {selectCategory(self.state.midiAnthemNames)}
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
