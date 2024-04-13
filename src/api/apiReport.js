import axios from 'api/axios';

export const getInfoReport = (data, token) => {
  return axios.post('/dashboard/report/overview', data, {
    headers: {
      Authorization: token,
    },
  });
};
