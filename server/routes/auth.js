import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import User_table from '../models/user';
import users_table from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {

  const { identifier, password } = req.body;
  console.log(req.body)
  console.log('console post')

  users_table.findOne({username: identifier}).then(user => {
      if (user) {
        console.log(user)
        bcrypt.compare(password, user.password, function(err, response) {
			    if (err) throw err;
          // response === true: correct password 
			    if (response == true) {
            console.log('right password')
            console.log(jwt)
            const token = jwt.sign({
              id: user._id,
              username: user.username
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

  // User_table.where('username', identifier).fetch().then(user => {
  //   if (user) {
  //     bcrypt.compare(password, user.attributes.password, function(err, response) {
	// 		    // response === true: correct password 
	// 		    if (response == true) {
  //           console.log('right password')
  //           const token = jwt.sign({
  //             id: user.attributes.userId,
  //             username: user.attributes.username
  //           }, config.jwtSecret);
            
  //           // send jwt token back as json
  //           res.json({token})
  //         } // close if response statement
  //     }) //close bcrypt compare password
  //   } 
  //   else {
  //     res.status(401).json({ errors: { form: 'Invalid Credentials' } });
  //   }
  // });


});

export default router;
