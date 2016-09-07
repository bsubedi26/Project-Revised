import React from 'react';

class Events extends React.Component {
  render() {
    return (
            <div className="panel panel-default">
            <div className="panel-body">
                {this.props.event}
            </div>
            </div>
    );
  }
}

export default Events;
