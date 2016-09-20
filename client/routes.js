import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import LoginPage from './components/login/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import MidiArchives from './components/midi/MidiArchives';
import Youtube from './components/youtube/Youtube';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="login" component={LoginPage} />
    <Route path="dashboard" component={requireAuth(Dashboard)} />
    <Route path="midi-archives" component={requireAuth(MidiArchives)} />
    <Route path="youtube" component={Youtube} />
  </Route>
)