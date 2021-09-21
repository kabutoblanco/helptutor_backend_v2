import axios from 'axios';

import { tokenConfig } from '../redux/actions/utils';
import store from '../redux/store';

// SELF
export const getStudent = (id) => {
  return axios.get('api/student/' + id, tokenConfig(store.getState));
};

export const patchStudent = (id, data) => {
  return axios.patch('api/student/' + id + '/', data, tokenConfig(store.getState));
};

//KNOWLEDGE_AREAS
export const getStudentKnowledgeAreas = (id) => {
  return axios.get('api/student/' + id + '/knowledgearea', tokenConfig(store.getState));
};

// OFFERS
export const postStudentOffer = (data) => {
  return axios.post('api/offer/', data, tokenConfig(store.getState));
};

export const patchStudentOffer = (id, data) => {
  return axios.patch('api/offer/' + id + '/', data, tokenConfig(store.getState));
};

export const deleteStudentOffer = (id) => {
  return axios.delete('api/offer/' + id, tokenConfig(store.getState));
};

export const getStudentOffers = (id) => {
  return axios.get('api/student/' + id + '/offer', tokenConfig(store.getState));
};

// OFFERS
export const getStudentServices = () => {
  return axios.get('api/student/service/', tokenConfig(store.getState));
};
