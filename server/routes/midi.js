import express from 'express';
var db = require('../config/db_config.js');
var mongojs = require('mongojs');
const fs = require('fs');
const path = require('path');

var router = express.Router();
//GET route for getting user favorite midi files
router.get('/getFavorites', function(req,res) {
    console.log(req.user)
    db.user.findOne({_id: mongojs.ObjectId(req.user._id)}, function(err, user) {
      if (err) throw err;
      res.json(user);

    })
})
// POST route for adding user favorite midi files
router.post('/addFavorites', function(req,res) {
  console.log(req.body)
  const {user, favorites} = req.body;
  
  db.user.findAndModify({
    query: { username: user },
    update: { $set: { favoriteMidis: favorites } },
    new: true
  }, function (err, docs, lastErrorObject) {
    if (err) throw err;
    // docs.favoriteMidis === favorites
    console.log(docs)
  })

})

router.get('/contemporary', function(req,res) {  
  fs.readdir(path.join(__dirname, '../../public/midi/contemporary'), (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of strings)
    var arr = [];
    arr.push(files);
    res.json(arr);

    //Create an object from the array of files 
    // var newArray = arr.map(function(file, i) {
    //   return {
    //     name: file,
    //     liked: false,
    //     count: 0
    //   }
    // })

  })
});

router.get('/games', function(req,res) {
  fs.readdir(path.join(__dirname, '../../public/midi/games'), (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});

router.get('/movies', function(req,res) {
  fs.readdir(path.join(__dirname, '../../public/midi/movies'), (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});

router.get('/anthems', function(req,res) {
  fs.readdir(path.join(__dirname, '../../public/midi/anthems'), (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});

export default router;
