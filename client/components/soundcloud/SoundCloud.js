import SC from 'soundcloud';
import React from 'react';
// import { Provider } from 'react-redux';
// import configureStore from './stores/configureStore';
// import * as actions from './actions';
// import Stream from './components/Stream';
import { CLIENT_ID, REDIRECT_URI } from './auth';

class SoundCloud extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      activeTab: "",
      searchResults: []

    }
  }
  componentWillMount() {
    SC.initialize({ 
      client_id: CLIENT_ID, 
      redirect_uri: REDIRECT_URI 
    });

  }
  componentDidMount() {
    var self = this;
    self.searchTop();
    self.searchAmbient();
    self.searchClassical();
    self.searchJazz();
    self.searchSoundtrack();
    self.searchWorld();

      $(document).ready(function () {
        $('ul.nav-tabs > li').click(function (e) {
            e.preventDefault();
            $('ul.nav > li').removeClass('active');
            $(this).addClass('active'); 
            var activeTab = $(this).text().toLowerCase();
            console.log(activeTab)
            // set the active tab as state
            self.setState({
              activeTab: activeTab
            })               
        });            
    });
    
  }

  searchSC(genre) {
    var self = this;
    // GET request to soundcloud with the genre passed in as an argument
    // After the promise is returned set the genre as the key and the track information as value
    SC.get('/tracks', 
    { genres: genre,
      limit: 50 
    }).then(function(tracks) {
      self.setState({
        [genre]: tracks.map(function(track,i) {
                  return {
                    id: i, 
                    title: track.title, 
                    stream_url: track.stream_url, 
                    uri: track.uri
                  }
              })
      });
    });
  }
  
  searchTop() {
    this.searchSC("top 50")
  }

  searchAmbient() {
    this.searchSC("ambient")    
  }
  
  searchClassical() {
    this.searchSC("classical")
  }

  searchJazz() {
    this.searchSC("jazz & blues")
  }
  
  searchSoundtrack() {
    this.searchSC("soundtrack")    
  }

  searchWorld() {
    this.searchSC("world")
  }
  enterPressed(e) {
    var self = this;

    if (e.key === 'Enter') {
      SC.get('/tracks', {
        q: self.state.input
        }).then(function(tracks) {
          console.log(tracks);
          self.setState({
            searchResults: tracks
          })
        });
    }
  }
    
  inputChanged(event) {
    var obj = {}
    obj[event.target.id] = event.target.value
    this.setState(obj)
    console.log(this.state)

  }

  play(e) {
    var uri = e.target.getAttribute('data-name');
    console.log(uri)
    
    if (uri !== null) {
      console.log(uri.indexOf('tracks'))
      console.log(uri.slice(uri.indexOf('tracks')))
      var uriSliced = uri.slice(uri.indexOf('tracks'));

      SC.oEmbed(uriSliced, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
      });

      // SC.stream(uri.slice(uri.indexOf('tracks')), function(sound){
      //     sound.play();
      // });
    }
  }

  stop() {

  }

  download() {

  }

  render() {
    var self = this;
    function selectCategory(arr) {
    return arr.map((track,i) => {
        return (
          <div key={i} className="card col-md-6">
          <div key={i} className="card-block">
            <h2 key={i}>{track.title}</h2>

            <button data-name={track.stream_url} onClick={self.play.bind(self)} type="button" className="controlBtns btn btn-default btn-md">
            <span className="glyphicon glyphicon-play"></span>
            </button>
            <button data-name={track.uri} onClick={self.stop} type="button" className="controlBtns btn btn-default btn-md">
            <span className="glyphicon glyphicon-stop"></span>
            </button>
            <button data-name={track.uri} onClick={self.download} type="button" className="controlBtns btn btn-default btn-md">
            <span className="glyphicon glyphicon-download-alt"></span>
            </button>
            <button data-name={track.uri} onClick={self.play} type="button" className="controlBtns btn btn-default btn-md">
            <span className="glyphicon glyphicon-star"></span>
            </button>

            
          </div>
          </div>
        )
      })
   }

    return (
        <div>
          <h2 className="text-center">SoundCloud Page</h2>
            <hr />
              <input placeholder="Search SoundCloud" type="text" onChange={this.inputChanged.bind(this)} onKeyPress={this.enterPressed.bind(this)} className="form-control" id="input" />
            <hr />

             <ul className="nav nav-tabs">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Top 50</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Ambient</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Classical</a>
                </li>
                 <li className="nav-item">
                    <a className="nav-link" href="#">Jazz & Blues</a>
                </li>
                 <li className="nav-item">
                    <a className="nav-link" href="#">Soundtrack</a>
                </li>
                 <li className="nav-item">
                    <a className="nav-link" href="#">World</a>
                </li>
            </ul>

            <If condition={ self.state.activeTab === 'top 50' }>
                  {selectCategory(self.state["top 50"])}
              </If>
              
              <If condition={ self.state.activeTab === 'ambient' }>
                  {selectCategory(self.state.ambient)}
              </If>

              <If condition={ self.state.activeTab === 'classical' }>
                  {selectCategory(self.state.classical)}
              </If>

              <If condition={ self.state.activeTab === 'jazz & blues' }>
                  {selectCategory(self.state["jazz & blues"])}
              </If>

              <If condition={ self.state.activeTab === 'soundtrack' }>
                  {selectCategory(self.state.soundtrack)}
              </If>

              <If condition={ self.state.activeTab === 'world' }>
                  {selectCategory(self.state.world)}
              </If>
              
            
        </div>
    );
  }
}

export default SoundCloud;
