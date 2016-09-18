import React from 'react';
import axios from 'axios';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Scraper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      videos: [],
      isLoading: true
    };
  }

  componentDidMount() {
    // axios.get('/api/scrape/test').then( (audio) => {
    //   console.log(audio)
    // })

    axios.get('/api/scrape/get').then( (data) => {
      console.log(data)
      this.setState({
        videos: data.data
      })
    })

    if($('body').find('.videos'.length > 21)) {
      this.setState({
        isLoading: false
      })
    }

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

            <object className="embed-responsive embed-responsive-16by9" width="500" height="320">
              <param name="allowscriptaccess" value="always"/>
              <embed id={video.title} width="500" height="320" src={video.link} className="youtube-player embed-responsive-item" type="text/html" />
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

          <ReactCSSTransitionGroup
              transitionName="fade" 
              transitionEnterTimeout={1000} 
              transitionLeaveTimeout={2000}>
              {vids}
          </ReactCSSTransitionGroup>

      </div>

    );
  }
}

export default Scraper;