import axios from 'api/axios';
export const getDataAllUser = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};
export const getDataUserById = (id) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
};
