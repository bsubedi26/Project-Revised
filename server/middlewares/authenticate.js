import jwt from 'jsonwebtoken';
import config from '../config';
import users_table from '../models/user';
var mongojs = require('mongojs');
var db = require('../config/db_config.js');

// AUTHENTICATION middleware to use in other routes that need authentication
export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

// If there is authorizationHeader then set token
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
    // console.log("token: "+token)
  }

// If token then verify the token and match the decoded id to the user in the database 
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        // console.log(decoded)

        db.user.findOne({_id: mongojs.ObjectId(decoded.id)}, function(err, user) {
          if (err) throw err;

          if (!user) {
            console.log('no user');
            res.status(404).json({ error: 'No such user' });
          } 
          else {
            console.log('user found')
            // console.log(user)
            // set currentUser property on the request object as user so it can be accessed again if needed
            req.user = user;
            next();
          }
        })

      }
    });
  } 
  else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}
