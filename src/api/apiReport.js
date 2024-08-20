import axios from 'api/axios';

export const getInfoReport = (data) => {
  return axios.post('/dashboard/report/overview', data);
};

export const exportOverview = (data) => {
  return axios.get(`/dashboard/report/export/overview?from=${data.from}&to=${data.to}`);
};
