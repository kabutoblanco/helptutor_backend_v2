import axios from 'axios';

import { tokenConfig } from '../redux/actions/utils';
import store from '../redux/store';

// SELF
export const getAnswers = () => {
  return axios.get('api/answer/', tokenConfig(store.getState));
};