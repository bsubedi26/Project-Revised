var Alt = require('alt');
var alt = new Alt();

var LocationActions = require('./actions');

class LocationStore {
  constructor() {
    this.locations = [
      {id: 1, name: "US"},
      {id: 2, name: "AK"},
      {id: 3, name: "BZ"}
    ];

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS
    });
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');