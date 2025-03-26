import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: 'https://invoicing-inviz-91f04ebfd463.herokuapp.com',
});
