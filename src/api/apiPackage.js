import axios from './axios';
export const getListPackage = () => {
  return axios.post('/dashboard/package/list');
};
export const createNewPackage = (data) => {
  return axios.post('/dashboard/package/add', data);
};
export const updatePackage = (data) => {
  return axios.post('/dashboard/package/update', data);
};
export const deletePackageByCode = (data) => {
  return axios.post('/dashboard/package/remove', data);
};

export const enablePackage = (data) => {
  return axios.post('/dashboard/package/activate', data);
};

export const disablePackage = (data) => {
  return axios.post('/dashboard/package/deactivate', data);
};

export const reportPackage = (data) => {
  return axios.post('/dashboard/report/package', data);
};

export const exportByPackage = (data) => {
  return axios.get(`/dashboard/report/export/package?from=${data.from}&to=${data.to}&code=${data.code}`);
};

export const historyRegistration = (data) => {
  return axios.post('/dashboard/history/registration', data);
};
