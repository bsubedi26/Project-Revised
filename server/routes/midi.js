import express from 'express';
import User from '../models/user';
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

var router = express.Router();

var tab = [];
// push the tab the user is currently on to the tab array
router.post('/tab', function(req,res) {
  tab.push(req.body.tab)
  console.log(tab)
})

router.post('/upload', function(req,res) {
  // console.log('----------------')
  // console.log(req.session.username)
  
    // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // Save the uploaded file to the folder of the selected tab 
  // form.uploadDir = path.join(__dirname, '../../public/user/'+req.session.username);
  form.uploadDir = path.join(__dirname, '../../public/midi/'+tab.pop());


  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

})
router.post('/updateToken/', function(req,res) {

  const {_id, token} = req.body;
  User.findOneAndUpdate({ _id: _id }, { $set: { midi_token: token } }, function(err, doc) {
      if (err) throw err;
      console.log(doc)
      
  });

})

router.get('/setMidiToken/:id', function(req,res) {
    var id = req.params.id
     User.findOne({_id: id}, '_id, midi_token', function(err, user) {
      if (err) throw err;
      console.log(user)
      res.json(user)
    })
})

router.get('/folder/:name', function(req,res) {
  var name = req.params.name;

  fs.readdir(path.join(__dirname, '../../public/midi/'+name), (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});

export default router;