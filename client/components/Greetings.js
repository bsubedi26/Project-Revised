import React from 'react';

import { connect } from 'react-redux';
import { addNewData } from '../actions/newDataActions';

class Greetings extends React.Component {
  
  render() {
    return (

        <div className="fullscreen-bg jumbotron">

          <h1 className="text-center h1-white-text">Main Page!</h1>
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
