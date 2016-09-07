const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const fs = require('fs');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

const compiler = webpack(config);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

// if (isDeveloping) {
//   const compiler = webpack(config);
//   const middleware = webpackMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     contentBase: 'src',
//     stats: {
//       colors: true,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false
//     }
//   });

//   app.use(middleware);
//   app.use(webpackHotMiddleware(compiler));

//   app.get('*', function response(req, res) {
//     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
//     res.end();
//   });
// } else {
//   app.use(express.static(__dirname + '/dist'));
//   app.get('*', function response(req, res) {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
//   });
// }
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
import users from './server/routes/users';
import auth from './server/routes/auth';
import events from './server/routes/events';

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
app.get('/getImages', function(req,res) {
  console.log(__dirname)
  fs.readdir('./public/images', (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })

});

app.get('/midi/contemporary', function(req,res) {
  fs.readdir('./public/midi/contemporary', (err, files) => {
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


app.get('/midi/games', function(req,res) {
  fs.readdir('./public/midi/games', (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});

app.get('/midi/movies', function(req,res) {
  fs.readdir('./public/midi/movies', (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});

app.get('/midi/anthems', function(req,res) {
  fs.readdir('./public/midi/anthems', (err, files) => {
    if (err) throw err;
    // files is an array that have the names of the midi files in the directory (type: array of string)
    var arr = [];
    arr.push(files);
    res.json(arr);
  })
});
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
