import express from 'express';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

var db = require('../config/db_config.js').mongojs;
var db2 = require('../config/db_config.js').monk;

var router = express.Router();

// // POST for user login
// router.post('/login', (req, res) => {

//   const { identifier, password } = req.body;
//   console.log('console post')
//   console.log(req.body)

//   User.findOne({ username: identifier }, function (err, user) {
//     if (err) throw err;
//     console.log(user)
  
//     if (user) {
//       bcrypt.compare(password, user.password, function(err, response) {
// 			    if (err) throw err;
//           // response === true: correct password 
// 			    if (response == true) {
//             console.log('right password')
//             req.session.userid = user._id;
//             req.session.save();
            
//             const token = jwt.sign({
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }, config.jwtSecret);
//             // send jwt token back as json
//             setAuthorizationToken(token);

//             res.json({token})
//           } // close if response statement
//       }) //close bcrypt compare password
//     }
//     else {
//       res.json({ errors: { form: 'Invalid Credentials' } });
//     }
  

//   })

// });

// POST for user signup
router.post('/signup', async function(req,res) {
  const { username, password, email } = req.body;
  hashPassword(password).then(function(hashed) {

    var user = new User({
        username: username,
        password: hashed,
        email: email,
        midi_token: 50,
        video_token: 50
      });
        
    user.save(function (err, user) {
      if (!err) {
        // SUCCESS
        console.log('user created')
        var response = {
          error: false,
          user: user
        }
        res.json(response)
      }
      else {
        //TODO: return page with errors
        var response = {
          error: true
        }
        res.json(response)
      }
    });
    
  })

})

function hashPassword(password) {
    return new Promise(function(resolve, reject) {
    // creating the user by inserting the user info into the db
    bcrypt.genSalt(10, function(err, salt) {
        if (err) throw err;
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in the password DB. 
            if (err) throw err;
            resolve(hash);
        })
      });
    });
}

export default router;

// router.get('/:identifier', (req, res) => {
//   User.query({
//     select: [ 'username', 'email' ],
//     where: { email: req.params.identifier },
//     orWhere: { username: req.params.identifier }
//   }).fetch().then(user => {
//     res.json({ user });
//   });
// });