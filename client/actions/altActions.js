var alt = require('../alt/alt');

class LocationActions {
  updateLocations(locations) {
    return locations;
  }
}

module.exports = alt.createActions(LocationActions);