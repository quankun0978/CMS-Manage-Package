import axios from './axios';
export const getListPackage = (token) => {
  return axios.post('/dashboard/package/list', null, {
    headers: {
      Authorization: token,
    },
  });
};
export const createNewPackage = (data, token) => {
  return axios.post('/dashboard/package/add', data, {
    headers: {
      Authorization: token,
    },
  });
};
export const updatePackage = (data, token) => {
  return axios.post('/dashboard/package/update', data, {
    headers: {
      Authorization: token,
    },
  });
};
export const deletePackageByCode = (data, token) => {
  return axios.post('/dashboard/package/remove', data, {
    headers: {
      Authorization: token,
    },
  });
};

export const enablePackage = (data, token) => {
  return axios.post('/dashboard/package/activate', data, {
    headers: {
      Authorization: token,
    },
  });
};

export const disablePackage = (data, token) => {
  return axios.post('/dashboard/package/deactivate', data, {
    headers: {
      Authorization: token,
    },
  });
};

export const reportPackage = (data, token) => {
  return axios.post('/dashboard/report/package', data, {
    headers: {
      Authorization: token,
    },
  });
};

export const historyRegistration = (data, token) => {
  return axios.post('/dashboard/history/registration', data, {
    headers: {
      Authorization: token,
    },
  });
};
