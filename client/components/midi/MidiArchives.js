import React from 'react';
import axios from 'axios';
import {isEmpty} from'lodash';


class MidiArchives extends React.Component {
  
  constructor(props) {
    super(props)
    this.state =  {
      midiContemporaryNames: [],
      midiGameNames: [],
      midiMovieNames: [],
      midiAnthemNames: [],
      midiLoaded: false,
      input: "",
      tab: ""
    }
  }

  componentDidMount() {
    var self = this;

    this.getContemporary();
 
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

  getContemporary() {
  var self = this;
    axios.get('/midi/contemporary').then(function(data) {
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
     axios.get('/midi/games').then(function(data) {
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
     axios.get('/midi/movies').then(function(data) {
      var movieNames = data.data[0];
      console.log(movieNames)

      // Replace midiNames state with new array data
      self.setState({
        midiMovieNames: movieNames
      });
    
    })
  }

  getAnthems() {
     var self = this;
     console.log(this.state);
     axios.get('/midi/anthems').then(function(data) {
      var anthemNames = data.data[0];

      // Replace midiNames state with new array data
      self.setState({
        midiAnthemNames: anthemNames
      });
    
    })
  }

  play(e) {
    // Get the name of the midi file to play
    var name = e.target.getAttribute('data-name');
    // Get the active nav tab to pass it into the url
    var activeTab = $('body').find('.active').text().toLowerCase();
    console.log(activeTab)

    var rootDir = '/midi/';
    MIDIjs.play(rootDir+activeTab+'/'+name);

  }

  stop(e) {
    var name = e.target.getAttribute('data-name');
    MIDIjs.stop('/audio/'+name);
  }

  inputChanged(event) {
    var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
    	console.log(this.state);
  }
            
  render() {
   var self = this;

   function add(arr) {
   return arr.map((midi,i) => {
      //Remove .mid extension
      var midiRealName = midi.slice(0, midi.indexOf('.'))
      //Replace all _ with spaces
      midiRealName = midiRealName.replace(/_/g, ' ');
      midiRealName = midiRealName.replace(/-/g, ': ');
      return (
        <div key={i} className="card col-md-6">
        <div key={i} className="card-block">
          <h2 key={i} >{midiRealName}</h2>
          <a href="#"><i data-name={midi} className="large material-icons" onClick={self.play}>play_arrow</i></a>
          <a href="#"><i data-name={midi} className="large material-icons" onClick={self.stop}>stop</i></a>
          <a href="#"><i data-name={midi} className="large material-icons" onClick={self.play}>replay</i></a>
          <a href="#"><i data-name={midi} className="large material-icons thumb" onClick={self.stop}>thumb_up</i></a>
          <a href="#"><i data-name={midi} className="large material-icons thumb" onClick={self.stop}>thumb_down</i></a>
          
          
        </div>
        </div>
      )
    })
   }
    return (

        <div>
          
          <h1 className="text-center">Welcome to the Midi Archives Page!</h1>
          <hr />
           <input type="text" onChange={this.inputChanged.bind(this)} className="form-control" id="input" />
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
      

                <If condition={ self.state.tab === 'contemporary' }>
                    {add(self.state.midiContemporaryNames)}
                </If>
                
                <If condition={ self.state.tab === 'games' }>
                    {add(self.state.midiGameNames)}
                </If>

                <If condition={ self.state.tab === 'movies' }>
                    {add(self.state.midiMovieNames)}
                </If>

                <If condition={ self.state.tab === 'anthems' }>
                    {add(self.state.midiAnthemNames)}
                </If>
                
          
        </div>

      
    );
  }
}

export default MidiArchives;



//  var self = this;
//    var midiShow = this.state.midiNames.map((midi,i) => {
//       //Remove .mid extension
//       var midiRealName = midi.slice(0, midi.indexOf('.'))
//       //Replace all _ with spaces
//       midiRealName = midiRealName.replace(/_/g, ' ');
//       midiRealName = midiRealName.replace(/-/g, ': ');
//       return (
//         <div key={i} className="card col-md-6">
//         <div key={i} className="card-block">
//           <h2 key={i} >{midiRealName}</h2>
//           <a href="#"><i data-name={midi} className="large material-icons" onClick={this.play}>play_arrow</i></a>
//           <a href="#"><i data-name={midi} className="large material-icons" onClick={this.stop}>stop</i></a>
//           <a href="#"><i data-name={midi} className="large material-icons" onClick={this.play}>replay</i></a>
//           <a href="#"><i className="large material-icons">playlist_add</i></a>
//         </div>
//         </div>
//       )
//     })