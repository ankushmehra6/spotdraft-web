import axios from 'axios';

console.log("axios instance created", localStorage.getItem('token'));
const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
