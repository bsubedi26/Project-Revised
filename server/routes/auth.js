import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

let router = express.Router();

// POST for user login
router.post('/', (req, res) => {

  const { identifier, password } = req.body;
  console.log('console auth post')

  User.findOne({username: identifier}, function(err, user) {
    if (err) throw err;

    if (user) {
      bcrypt.compare(password, user.password, function(err, response) {
			    if (err) throw err;
          // response === true: correct password 
			    if (response == true) {
            console.log('right password')

            req.session.userid = user._id;
            req.session.save();
            console.log(req.session)
            const token = jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email
            }, config.jwtSecret);
            // send jwt token back as json
            res.json({token})
          } // close if response statement
          else {
            // If password don't match send form error
            res.json({ errors: { form: 'Invalid Credentials' } });
          }
      }) //close bcrypt compare password
    }
    else {
      // If login credentials don't match send form error
      res.json({ errors: { form: 'Invalid Credentials' } });
    }
  })
});

export default router;
