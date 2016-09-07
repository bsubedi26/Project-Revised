import React from 'react';
import axios from 'axios';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      midiNames: [],
      imgNames: [],
      imgLoaded: false
    };

  }

getImages() {
  var self = this;
    // GET Image request
     axios.get('/getImages').then(function(data) {
        var images = data.data[0]
        console.log(images)
        self.setState({
        imgNames: images
      })
        self.setState({
          imgLoaded: true
        })
      
     })
}

  componentDidMount() {
    
    this.getImages();

  }

  inputChanged(e) {
    var obj = {id: e.target.id, value: e.target.value}
    // console.log(obj)
    this.setState(obj)
      console.log(this.state)
  }
 
  render() {
    var photos = this.state.imgNames.map((photo,i) => {
      return (
        
          <div key={photo} className="card col-md-3">
          <img className="card-img-top" alt={photo} width="250" height="200" key={i} src={"images/"+photo} />
          <div key={photo} className="card-block">
            <p key={photo} className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          </div>
      )
    })

    return (

        <div>
          <h1 className="text-center">Welcome to the Dashboard Page!</h1>
          <hr />
            <div className="form-group">
              <input type="text" onChange={this.inputChanged.bind(this)} className="form-control" id="input" />
                <hr />

                {photos}

        </div>
          
        </div>

      
    );
  }
}

export default Dashboard;
