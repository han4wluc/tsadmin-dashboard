import axios from 'axios';

import { TS_ADMIN_API_ENDPOINT } from '~/constants';

const client = axios.create({
  baseURL: TS_ADMIN_API_ENDPOINT,
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
