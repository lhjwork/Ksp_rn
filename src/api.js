import axios from 'axios';

axios.defaults.baseURL = 'https://backendapi.kspcshop.com';
// process.env.NODE_DEV === 'development
if (process.env.NODE_DEV === 'production') {
  axios.defaults.baseURL = 'https://backendapi.kspcshop.com';
}
const api = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: true,
});

export default api;
