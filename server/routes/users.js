import express from 'express';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';
const path = require('path');
var router = express.Router();
const fs = require('fs');

// POST for user signup
router.post('/signup', async function(req,res) {
  const { username, password, email } = req.body;

    function makeDir(dir) {
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
    }

  
  hashPassword(password).then(function(hashed) {

    var pathToFolder = path.join(__dirname, '../../public/user/'+username)
    //makeDir(pathToFolder)

    var user = new User({
        username: username,
        password: hashed,
        email: email,
        midi_token: 10,
        video_token: 10
        
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