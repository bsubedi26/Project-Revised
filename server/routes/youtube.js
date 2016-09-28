import express from 'express';
import User from '../models/user';
var request = require('request');
var cheerio = require('cheerio');
const path = require('path');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ytdl = require('ytdl-core');

let router = express.Router();

router.get('/dl-video/:id/:title', (req,res) => {
  var videoId = req.params.id
  var title = req.params.title
  console.log(videoId)
  console.log(title)
  ytdl('https://www.youtube.com/watch?v='+videoId)
    .pipe(fs.createWriteStream(path.join(__dirname,'../../public/videos/'+title+'.flv')));

    var data = {
      title: title
    }
    
    res.json(data)

})

router.get('/delete-video/:id/:title', (req,res) => {
  var videoId = req.params.id
  var title = req.params.title
  
  fs.unlink(path.join(__dirname,'../../public/videos/'+title+'.flv'), (err) => {
    if (err) throw err;
    console.log('successfully deleted file');
  });

})

router.get('/dl-audio/:id/:title', (req,res) => {
  var videoId = req.params.id
  var title = req.params.title
  console.log(videoId)
  console.log(title)
  ytdl('https://www.youtube.com/watch?v='+videoId, {filter: "audioonly"})
    .pipe(fs.createWriteStream(path.join(__dirname,'../../public/videos/'+title+'.wav')));

    var data = {
      title: title
    }
    
    res.json(data)

})

router.get('/delete-audio/:id/:title', (req,res) => {
  var videoId = req.params.id
  var title = req.params.title
  
  fs.unlink(path.join(__dirname,'../../public/videos/'+title+'.wav'), (err) => {
    if (err) throw err;
    console.log('successfully deleted file');
  });

})

// router.get('/dl/:id/:title', (req,res) => {
//   var videoId = req.params.id
//   var title = req.params.title
//   console.log(videoId)
//   console.log(title)
  
  
//   //  ytdl('https://www.youtube.com/watch?v='+videoId)
//   //   .pipe(fs.createWriteStream(path.join(__dirname,'../../public/videos/video.flv')));

//    ytdl('https://www.youtube.com/watch?v='+videoId, {filter: "audioonly"})
//     .pipe(fs.createWriteStream(path.join(__dirname,'../../public/videos/'+title+'.wav')));

//     var data = {
//       title: title
//     }
    
//     res.json(data)

// })

export default router;
