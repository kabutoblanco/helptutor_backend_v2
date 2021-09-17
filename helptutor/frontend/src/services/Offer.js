import axios from 'axios';

import { tokenConfig } from '../redux/actions/utils';
import store from '../redux/store';

// SELF
export const getOffers = () => {
  return axios.get('api/offer', tokenConfig(store.getState));
};