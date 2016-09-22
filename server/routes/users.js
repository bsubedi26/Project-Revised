import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';

var db = require('../config/db_config.js').mongojs;
var db2 = require('../config/db_config.js').monk;

var router = express.Router();

// // POST route for creating new user
// router.post('/signup', (req, res) => {
//   console.log(req.body);
//   const { username, password, email } = req.body;
  
//   dbCall(username, password, email).then( (returnedUser) => {
//     console.log("--------------")
//     console.log(returnedUser)
//     var userID = returnedUser._id
//     res.json(userID)
//   });
// });

// using ES7 async/await for dealing with promises
router.post('/signup', async function(req,res) {
  const { username, password, email } = req.body;

  try {
    const returnedUser = await hashPassword(username, password, email);
    const filterOutPassword = await db2.findOne({_id: returnedUser._id}, "-password");
    res.json(filterOutPassword);
  }
  catch(err) {
    console.log(err)
  }
})

function hashPassword(username,password,email) {
         return new Promise(function(resolve, reject) {
          // creating the user by inserting the user info into the db
          bcrypt.genSalt(10, function(err, salt) {
              if (err) throw err;
              bcrypt.hash(password, salt, function(err, hash) {
                  // Store hash in the password DB. 
                  if (err) throw err;
                  resolve(db2.insert({ 
                    username: username, 
                    password: hash, 
                    email: email
                  }));
              })
            });
          });
    }

// // POST route for creating new user
// router.post('/', (req, res) => {
//   console.log('new user sign up post received');
//   const { username, password, email } = req.body;

//   // creating the user by inserting the user info into the db
// 	bcrypt.genSalt(10, function(err, salt) {
// 	    if (err) throw err;
// 	    bcrypt.hash(password, salt, function(err, hash) {
// 	        // Store hash in the password DB. 
// 	        if (err) throw err;
          
//           db.user.insert({ 
//             username: username, 
//             password: hash, 
//             email: email
//           }, function(data) {
//               res.redirect('/');
//           });
// 	    });
// 	});

// });

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