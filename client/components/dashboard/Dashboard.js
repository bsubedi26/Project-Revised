import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from '../../../global/Input';

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
    // axios.get('/api/midi/getFavorites').then( (userData) => {
    //   self.setState({
    //     favoriteMidi: userData.data.favoriteMidis
    //   })

    //   console.log(self.state)

    // })


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

          <hr />

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