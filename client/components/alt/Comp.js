import React from 'react';
import LocationStore from './store';

class Locations extends React.Component {

  constructor(props) {
      super(props)
      this.state = LocationStore.getState()
  }

  componentDidMount() {
    LocationStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
  render() {

    return (
      <div>
      <h1>Alt working</h1>
      <ul>
        {this.state.locations.map((location) => {
          return (
            <li>{location.name}</li>
          );
        })}
      </ul>
      </div>
    );
  }
}

export default Locations;