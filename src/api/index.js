import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'https://petsitterfriendly-production.up.railway.app/',
  baseURL: 'http://localhost:3001/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});
