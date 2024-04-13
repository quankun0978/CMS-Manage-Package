// @/src/common/refreshToken.js

import axios from 'api/axios';

const refreshTokenFn = async () => {
  const session = JSON.parse(localStorage.getItem('session'));

  try {
    const response = await axios.post('/user/refresh', {
      refreshToken: session?.refreshToken,
    });

    const { session } = response.data;

    if (!session?.accessToken) {
      localStorage.removeItem('session');
      localStorage.removeItem('user');
    }

    localStorage.setItem('session', JSON.stringify(session));

    return session;
  } catch (error) {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
  }
};
