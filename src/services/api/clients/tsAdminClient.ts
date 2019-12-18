import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

client.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('error.response', error.response);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default client;
