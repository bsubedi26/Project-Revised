import React from 'react';

class Player extends React.Component {

  render() {

    return (
        <div className="player row">
          <h2 className="white-text">Currently Playing | {this.props.playing}</h2>

          
        </div>
    );
  }
}

Player.propTypes = {
  playing: React.PropTypes.string.isRequired,
}

export default Player;
