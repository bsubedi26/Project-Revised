import React from 'react';
import axios from 'axios';
// var youtubeVideo = require('youtube-video');

class Scraper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      videos: []
    };
  }

  componentDidMount() {
    var self = this;
    // axios.get('/api/scrape/test').then( (audio) => {
    //   console.log(audio)
    // })

    axios.get('/api/scrape/get').then( (data) => {
      console.log(data)
      self.setState({
        videos: data.data
      })
    })
    

    // youtubeVideo('https://www.youtube.com/watch?v=rfh4Mhp-a6U', function (error, playback) {
    //  if (error) throw error;
    // //  playback.playVideo()
    // })
  }

  inputChanged(e) {
    var obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
    console.log(this.state)
  }
 
  render() {
    var self = this;
    
    var vids = self.state.videos.map( (video, i) => {
        return (
          <div key={i} className="well col-md-6 videos">
            <h3>{video.title}</h3>

            <object width="500" height="320">
              <param name="allowscriptaccess" value="always"/>
              <embed id={video.title} width="500" height="320" src={video.link} className="youtube-player" type="text/html" allowscriptaccess="always" allowFullScreen="true"/>
            </object>

          </div>
        )
    }) 
    return (

        <div>
          <h1 className="text-center">Welcome to the Video Archives Page!</h1>
          <hr />
          <input className="form-control" onChange={self.inputChanged.bind(self)} id="input" type="text"/>
          <hr />

          {vids}

      </div>

    );
  }
}

export default Scraper;