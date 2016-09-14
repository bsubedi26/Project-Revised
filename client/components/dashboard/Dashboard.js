import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      favoriteMidi: [],
      imgLoaded: false
    };
  }

  getUserInfo() {
    var self = this;
    // const {userInfo} = this.props;
    axios.get('/api/midi/getFavorites').then( (userData) => {
      self.setState({
        favoriteMidi: userData.data.favoriteMidis
      })

      console.log(self.state)

    })


  }

  componentDidMount() {
    this.getUserInfo();
  }

  inputChanged(e) {
    var obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
    // console.log(this.state)
    
  }
 
  render() {
    var self = this;
    const {userInfo} = this.props;

    return (

        <div>
          <h1 className="text-center">Welcome to the User Dashboard Page!</h1>
          <hr />

          <div className="row">

            <div className="col-md-4 well">
              <h1>User Information</h1>
              <h2>Username: {userInfo.user.username}</h2>
              <h2>Email: {userInfo.user.email}</h2>
            </div>

            <div className="col-md-4 well col-md-offset-1">
              <h1>User Favorites</h1>
                {self.state.favoriteMidi.map( (midi, i) => {
                  return <h2 key={i}>{i}: {midi}</h2>
                })}
            </div>

          </div>

        </div>

    );
  }
}

Dashboard.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth
  }
}

export default connect(mapStateToProps)(Dashboard);