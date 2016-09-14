import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';

var db = require('../config/db_config.js');
var router = express.Router();

// POST route for creating new user
router.post('/', (req, res) => {
  console.log('new user sign up post received');
  const { username, password, email } = req.body;

  // creating the user by inserting the user info into the db
	bcrypt.genSalt(10, function(err, salt) {
	    if (err) throw err;
	    bcrypt.hash(password, salt, function(err, hash) {
	        // Store hash in the password DB. 
	        if (err) throw err;
          
          db.user.insert({ 
            username: username, 
            password: hash, 
            email: email
          }, function(data) {
              res.redirect('/');
          });
	    });
	});

});

export default router;

  // const password_digest = bcrypt.hashSync(password, 10);

  // validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
  //   if (isValid) {
  //     const { username, password, timezone, email } = req.body;
  //     const password_digest = bcrypt.hashSync(password, 10);

  //     User.forge({
  //       username, timezone, email, password_digest
  //     }, { hasTimestamps: true }).save()
  //       .then(user => res.json({ success: true }))
  //       .catch(err => res.status(500).json({ error: err }));

  //   } else {
  //     res.status(400).json(errors);
  //   }
  // });




// function validateInput(data, otherValidations) {
//   let { errors } = otherValidations(data);

//   return User.query({
//     where: { email: data.email },
//     orWhere: { username: data.username }
//   }).fetch().then(user => {
//     if (user) {
//       if (user.get('username') === data.username) {
//         errors.username = 'There is user with such username';
//       }
//       if (user.get('email') === data.email) {
//         errors.email = 'There is user with such email';
//       }
//     }

//     return {
//       errors,
//       isValid: isEmpty(errors)
//     };
//   })

// }

// router.get('/:identifier', (req, res) => {
//   User.query({
//     select: [ 'username', 'email' ],
//     where: { email: req.params.identifier },
//     orWhere: { username: req.params.identifier }
//   }).fetch().then(user => {
//     res.json({ user });
//   });
// });