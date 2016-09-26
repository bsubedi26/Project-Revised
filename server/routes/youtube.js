import express from 'express';
var request = require('request');
var cheerio = require('cheerio');
const path = require('path');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ytdl = require('ytdl-core');

let router = express.Router();

router.get('/dl/:id/:title', (req,res) => {
  var videoId = req.params.id
  var title = req.params.title
  console.log(videoId)
  console.log(title)
  
  
  //  ytdl('https://www.youtube.com/watch?v='+videoId)
  //   .pipe(fs.createWriteStream(path.join(__dirname,'../../public/videos/video.flv')));

   ytdl('https://www.youtube.com/watch?v='+videoId, {filter: "audioonly"})
    .pipe(fs.createWriteStream(path.join(__dirname,'../../public/videos/'+title+'.wav')));

    var data = {
      title: title
    }
    
    res.json(data)

})


// router.get('/get', (req, res) => {

//     var options = {
//     url: 'https://www.reddit.com/r/HotSamples/',
//     headers: {
//       'User-Agent': 'request'
//     }
//   };

//   //main request to retrieve data and store into mongodb
//   request(options, function(error, response, html) {
//   if (error) throw error;
//   var results = [];
//   var $ = cheerio.load(html);
//     $(".thing").each(function(i, element) {

//       // if statement to retrieve only the youtube links
//       if ( $(this).find("a.title").attr('href').indexOf('youtube') !== -1 ) {
//         var title = $(this).find("a.title").text().trim();
//         var link = $(this).find("a.title").attr('href');
//         link = link.replace("watch?v=", "v/");

//         results.push({
//           title: title,
//           link: link
//         })

//       }

//     })
//     // console.log(results)
//     res.json(results)

//   })
// });

export default router;
