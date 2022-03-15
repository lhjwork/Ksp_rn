import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.8:5055/';
// process.env.NODE_DEV === 'development' // 개발
if (process.env.NODE_DEV === 'production') {
  // 배포
  //현재 가상으로 되어있는 url임
  axios.defaults.baseURL = 'http://54.102.1023:3000'; // 실제 서버 주소(=ec2 주소 or 도메인)
}
const api = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: true,
});

export default api;
