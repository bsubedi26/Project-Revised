// monk DB config
var monk = require('monk');
var db = monk('localhost:27017/REACT');

// export users table so it can be used in the routes 
var users_table = db.get('user');
module.exports = users_table;