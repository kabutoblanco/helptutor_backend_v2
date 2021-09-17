import { combineReducers } from 'redux';

import auth from './auth'
import utils from './utils';

import errors from './errors';
import messages from './messages';

export default combineReducers({
  auth,
  utils,
  errors,
  messages,
});