import axios from 'axios';
import { refreshToken } from './apiUser';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { PATH } from 'constants/consants';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    'Control-Allow-Origin': '*',
  },
});

instance.defaults.headers['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  function (config) {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      try {
        const refresh_Token = localStorage.getItem('refresh_token');
        const username = localStorage.getItem('username');
        // const response = await refreshToken({ username: username, refresh_token: refresh_Token });
        if (refreshToken && username) {
          const response = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/dashboard/user/refresh_token`, { username: username, refresh_token: refresh_Token });
          const { result } = response.data;
          let decodeToken = jwtDecode(result.access_token);
          let time = new Date(decodeToken.exp * 1000);

          Cookies.set('token', result.access_token, { expires: time });
          localStorage.setItem('refresh_token', result.refresh_token);
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `${result.access_token}`;
          window.location.reload();
        }
        return instance(originalRequest);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          window.location.reload();
        }
        return Promise.reject(error);
      }
    }
    if (error.response && error.response.status === 403) {
      try {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        Cookies.remove('token');
        window.location.reload();
        // const response = await refreshToken({ username: username, refresh_token: refresh_Token });

        return instance(originalRequest);
      } catch (error) {}
    }
    return Promise.reject(error);
  }
);

export default instance;
