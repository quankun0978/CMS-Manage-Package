import axios from 'api/axios';

export const checkLogin = (data) => {
  return axios.post('/dashboard/user/login', data);
};
export const getListUser = () => {
  return axios.post('/dashboard/user/list');
};
export const createNewUser = (data) => {
  return axios.post('/dashboard/user/add', data);
};
export const updateRole = (data) => {
  return axios.post('/dashboard/user/update_role', data);
};
export const updateStatus = (data) => {
  return axios.post('/dashboard/user/update_status', data);
};
export const deleteUser = (data) => {
  return axios.post('/dashboard/user/remove', data);
};

export const resetPasswordUser = (data) => {
  return axios.post('/dashboard/user/reset_password', data);
};

export const changePasswordUser = (data) => {
  return axios.post('/dashboard/user/update_password', data);
};

export const refreshToken = (data) => {
  return axios.post('/dashboard/user/refresh_token', data);
};
export const updatePassword = (data) => {
  return axios.post('/dashboard/user/update_password_first_time', data);
};
