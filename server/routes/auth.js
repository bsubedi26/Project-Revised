import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
var db = require('../config/db_config.js');

let router = express.Router();

// POST for user login
router.post('/', (req, res) => {

  const { identifier, password } = req.body;
  console.log('console post')

  db.user.findOne({username: identifier}, function(err, user) {
    if (err) throw err;

    if (user) {
      bcrypt.compare(password, user.password, function(err, response) {
			    if (err) throw err;
          // response === true: correct password 
			    if (response == true) {
            console.log('right password')
            const token = jwt.sign({
              id: user._id,
              username: user.username,
              email: user.email
            }, config.jwtSecret);
            // send jwt token back as json
            res.json({token})
          } // close if response statement
      }) //close bcrypt compare password
    }
    else {
      res.json({ errors: { form: 'Invalid Credentials' } });
    }
  })
});

export default router;
