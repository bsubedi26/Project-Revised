import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
// import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import { Router, browserHistory, hashHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import routes from './routes';

// since network calls are asynchronous, but Redux is synchronous - 
// we need to introduce the thunk middleware
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// if (localStorage.jwtToken) {
//   setAuthorizationToken(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
// }

const history = createHashHistory({queryKey: false})
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
render(
  <Provider store={store}>
    <Router history={appHistory} routes={routes} />
  </Provider>, document.getElementById('root'));
