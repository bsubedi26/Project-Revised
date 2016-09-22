import express from 'express';
var db = require('../config/db_config.js').mongojs;
var db2 = require('../config/db_config.js').monk;

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

// router.get('/contemporary', function(req,res) {  
//   fs.readdir(path.join(__dirname, '../../public/midi/contemporary'), (err, files) => {
//     if (err) throw err;
//     // files is an array that have the names of the midi files in the directory (type: array of strings)
//     var arr = [];
//     arr.push(files);
//     res.json(arr);

//     //Create an object from the array of files 
//     // var newArray = arr.map(function(file, i) {
//     //   return {
//     //     name: file,
//     //     liked: false,
//     //     count: 0
//     //   }
//     // })

//   })
// });

router.get('/folder/:name', function(req,res) {
  var name = req.params.name;
  console.log("-----")
  console.log(req.session)
  var userid = req.session.userid

  fs.readdir(path.join(__dirname, '../../public/midi/'+name), (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});

router.post('/star', function(req,res) {
  console.log(req.session)
  console.log(req.body)
  
  var userid = req.session.userid
  console.log(userid)

  var favorites = {
    title: req.body.title,
    star: req.body.star
  } 

db2.findAndModify(
      {
        "query": { "_id": userid },
        "update": { "$push": { 
            
           favorites: favorites
        }},
       
      },
      function(err,doc) {
        if (err) throw err;
        console.log( doc );
        res.json(doc)
      }
);

})
export default router;