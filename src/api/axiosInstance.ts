import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://showroom.eis24.me/api/v4/',
});

// Логирование запросов
axiosInstance.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request);
    return request;
  },
  (error) => {
    console.error('Request Error', error);
    return Promise.reject(error);
  }
);

// Логирование ответов
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;