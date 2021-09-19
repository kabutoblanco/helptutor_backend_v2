import axios from 'axios';

import { tokenConfig } from '../redux/actions/utils';
import store from '../redux/store';

// SELF
export const postAnswer = (data) => {
  return axios.post('api/answer/', data, tokenConfig(store.getState));
};

export const getAdvAnswers = (id) => {
  return axios.get('api/advertisement/' + id + '/answer/', tokenConfig(store.getState));
};
