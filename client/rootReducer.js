import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import newData from './reducers/newData';

export default combineReducers({
  flashMessages,
  auth,
  newData
});
