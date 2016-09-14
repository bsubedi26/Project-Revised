var Alt = require('alt');
var alt = new Alt();

class LocationActions {
  updateLocations(locations) {
    return locations;
  }
}

module.exports = alt.createActions(LocationActions);