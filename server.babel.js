import express from 'express';
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/dist'));

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
const db = require('./server/config/db_config').mongoose;

const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: 'supersecretstring12345!',
  saveUninitialized: true,
  resave: true,
  // store: new MongoStore({ mongooseConnection: db })
}))
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
import users from './server/routes/users';
import auth from './server/routes/auth';
import events from './server/routes/events';
import midi from './server/routes/midi';
import scrape from './server/routes/scrape';
import authenticate from './server/middlewares/authenticate';

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/midi', authenticate, midi);
app.use('/api/scrape', scrape);
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 8000;
app.listen(PORT, function(err) {
	if (err) throw err;
	console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', PORT, PORT);
});
