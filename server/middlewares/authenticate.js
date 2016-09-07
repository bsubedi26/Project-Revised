import jwt from 'jsonwebtoken';
import config from '../config';
// import User_table from '../models/user';
import users_table from '../models/user';
export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  // if (token) {
  //   jwt.verify(token, config.jwtSecret, (err, decoded) => {
  //     if (err) {
  //       res.status(401).json({ error: 'Failed to authenticate' });
  //     } else {
  //       console.log(decoded)
  //       User_table.query({
  //         where: { userId: decoded.id },
  //         select: [ 'email', 'userId', 'username' ]
  //       }).fetch().then(user => {
  //         if (!user) {
  //           res.status(404).json({ error: 'No such user' });
  //         } else {
  //           req.currentUser = user;
  //           next();
  //         }

  //       });
  //     }
  //   });
  // }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        
        users_table.findOne({_id: decoded.id}, { fields: { email: 1, _id: 1, username: 1 } }).then(function(user) {
          if (!user) {
            res.status(404).json({ error: 'No such user' });
          } else {
            req.currentUser = user;
            next();
          }
        })
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}
