import axios from 'axios';

import { tokenConfig } from '../redux/actions/utils';
import store from '../redux/store';

// SELF
export const getAdvertisements = () => {
  return axios.get('api/advertisement/', tokenConfig(store.getState));
};