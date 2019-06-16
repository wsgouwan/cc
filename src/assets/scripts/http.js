import axios from 'axios';
const service = axios.create({
  baseURL: 'https://authv2.vaiee.com',
});

service.defaults.headers.post['Content-Type'] = 'application/json';


export default service