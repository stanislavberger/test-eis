import axios from 'axios';
import { setup } from 'axios-cache-adapter';

const cache = setup({
  maxAge: 15 * 60 * 1000,
  clearOnStale: true
})

const axiosInstance = axios.create({
  baseURL: 'http://showroom.eis24.me/api/v4/',
  adapter: cache.adapter,
});

// log request
axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.error('Request Error', error);
    return Promise.reject(error);
  }
);

// log responsenpm
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response Error', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
