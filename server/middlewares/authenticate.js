import jwt from 'jsonwebtoken';
import config from '../config';
import users_table from '../models/user';

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

// If there is authorizationHeader then set token
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

// If token then verify the token and match the decoded id to the user in the database 
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        
        users_table.findOne({_id: decoded.id}, { fields: { email: 1, _id: 1, username: 1 } }).then(function(user) {
          if (!user) {
            res.status(404).json({ error: 'No such user' });
          } else {
            // set currentUser property on the request object as user so it can be accessed again if needed
            req.currentUser = user;
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
