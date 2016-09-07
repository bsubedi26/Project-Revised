import React from 'react';

import { connect } from 'react-redux';
import { addNewData } from '../actions/newDataActions';


class Greetings extends React.Component {
  buttonClicked() {
    console.log('button clicked')
    var obj = {
      greetings: 'hi'
    }
    
    this.props.addNewData(obj)

  }
  render() {
    return (

        <div className="fullscreen-bg">
          <video autoPlay muted loop id="bgvid">
            <source src="/videos/video-bg.mp4" type="video/mp4" />
          </video>
          
          <h1 className="text-center h1-white-text"></h1>

        </div>

      
    );
  }
}

Greetings.propTypes = {
  addNewData: React.PropTypes.func.isRequired,
  newData: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    newData: state.newData
  };
}

export default connect(mapStateToProps, {addNewData })(Greetings);

// export default Greetings;
