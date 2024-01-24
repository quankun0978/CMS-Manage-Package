import axios from 'api/axios';
export const getDataAllUser = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};
export const getDataUserById = (id) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
};
export const checkLogin = (data) => {
  return axios.post('/dashboard/user/login', data);
};
export const getListUser = (token) => {
  return axios.post('/dashboard/user/list', null, {
    headers: {
      Authorization: token,
    },
  });
};
export const createNewUser = (data, token) => {
  return axios.post('/dashboard/user/add', data, {
    headers: {
      Authorization: token,
    },
  });
};
export const updateRole = (data, token) => {
  return axios.post('/dashboard/user/update_role', data, {
    headers: {
      Authorization: token,
    },
  });
};
export const updateStatus = (data, token) => {
  return axios.post('/dashboard/user/update_status', data, {
    headers: {
      Authorization: token,
    },
  });
};
export const deleteUser = (data, token) => {
  return axios.post('/dashboard/user/remove', data, {
    headers: {
      Authorization: token,
    },
  });
};

export const resetPasswordUser = (data, token) => {
  return axios.post('/dashboard/user/reset_password', data, {
    headers: {
      Authorization: token,
    },
  });
};

export const changePasswordUser = (data, token) => {
  return axios.post('/dashboard/user/update_password', data, {
    headers: {
      Authorization: token,
    },
  });
};
