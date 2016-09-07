// import db from '../db/bookshelf';
// var User_table = db.Model.extend({
//   tableName: 'users'
// });
// module.exports = User_table;


var monk = require('monk');
var db2 = monk('localhost:27017/REACT');

var users_table = db2.get('user');
module.exports = users_table;


