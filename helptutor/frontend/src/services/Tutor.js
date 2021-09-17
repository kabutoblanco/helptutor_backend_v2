import axios from 'axios';

import { tokenConfig } from '../redux/actions/utils';
import store from '../redux/store';

// SELF
export const getTutor = (id) => {
  return axios.get('api/tutor/' + id, tokenConfig(store.getState));
};

export const patchTutor = (id, data) => {
  return axios.patch('api/tutor/' + id + '/', data, tokenConfig(store.getState));
};

//KNOWLEDGE_AREAS
export const postTutorKnowledgeArea = (data) => {
  return axios.post('api/knowledgearea_tutor/', data, tokenConfig(store.getState));
};

export const patchTutorKnowledgeArea = (id, data) => {
  return axios.patch('api/knowledgearea_tutor/' + id + '/', data, tokenConfig(store.getState));
};

export const getTutorKnowledgeAreas = (id) => {
  return axios.get('api/tutor/' + id + '/knowledgearea', tokenConfig(store.getState));
};

export const deleteTutorKnowledgeArea = (id) => {
  return axios.delete('api/knowledgearea_tutor/' + id, tokenConfig(store.getState));
};

// SERVICES
export const postTutorService = (data) => {
  return axios.post('api/service/', data, tokenConfig(store.getState));
};

export const patchTutorService = (id, data) => {
  return axios.patch('api/service/' + id + '/', data, tokenConfig(store.getState));
};

export const deleteTutorService = (id) => {
  return axios.delete('api/service/' + id, tokenConfig(store.getState));
};

export const getTutorServices = (id) => {
  return axios.get('api/tutor/' + id + '/service', tokenConfig(store.getState));
};

// OFFERS
export const getTutorOffers = (id) => {
  return axios.get('api/tutor/offer/', tokenConfig(store.getState));
};