 const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const fs = require('fs');
var cors = require('cors');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(cors());

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
import midi from './server/routes/midi';
import authenticate from './server/middlewares/authenticate';

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/midi', authenticate, midi);

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
