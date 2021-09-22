import axios from 'axios';

import { tokenConfig } from '../redux/actions/utils';
import store from '../redux/store';

export const getKnowledgeAreas = () => {
  return axios.get('api/knowledgearea/', tokenConfig(store.getState));
};

export const getSubKnowledgeAreas = (id) => {
  return axios.get('api/knowledgearea/' + id + '/knowledgearea', tokenConfig(store.getState));
};

// CERTIFICATES
export const getKnowledgeAreaCertificate = (id) => {
  return axios.get('api/knowledgearea/' + id + '/certificate/', tokenConfig(store.getState));
};
