import actionType from './actionstype';
import { getListUser, createNewUser, deleteUser, updateRole, updateStatus, resetPasswordUser } from 'api/apiUser';

import * as convert from 'ultils/convert';
import * as constants from 'constants/consants';

export const showModalEditUser = (check) => {
  return {
    type: actionType.SHOW_MODAL_EDIT_USER,
    check: check,
  };
};

export const showModalDeleteUser = (check) => {
  return {
    type: actionType.SHOW_MODAL_DELETE_USER,
    check: check,
  };
};

export const showModalResetPasswword = (check) => {
  return {
    type: actionType.SHOW_MODAL_RESET_PASSWORD,
    check: check,
  };
};

export const showModalCreateUser = (check) => {
  return {
    type: actionType.SHOW_MODAL_CREATE_USER,
    check: check,
  };
};

export const showModalDetailUser = (check) => {
  return {
    type: actionType.SHOW_MODAL_DETAIL_USER,
    check: check,
  };
};

export const getDataListUser = (token) => {
  return async (dispath, getstate) => {
    try {
      let data = await getListUser(token);
      let dt = data.data.result.map((item) => {
        return {
          ...item,
          status: convert.convertStatus(item.status),
        };
      });
      if (dt && dt.length > 0) dispath(getListUserSuccess(dt));
      else dispath(getListUserFail());
    } catch (e) {
      dispath(getListUserFail());
    }
  };
};

const getListUserSuccess = (data) => {
  return {
    type: actionType.GET_LIST_USER_SUCCESS,
    data,
  };
};

const getListUserFail = () => {
  return {
    type: actionType.GET_LIST_USER_FAIL,
  };
};

export const getUserByUsername = (username) => {
  return {
    type: actionType.GET_USER_BY_USERNAME,
    username,
  };
};

export const createUser = (data, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await createNewUser(data);
      if (res && res.data && Object.keys(res.data).length > 0) dispath(createUserSuccess(res.data));
      else dispath(createUserFail(res.data));
    } catch (e) {
      dispath(createUserFail({ results: constants.STATUS.FAIL }));
    }
  };
};

const createUserSuccess = (result) => {
  return {
    type: actionType.CREATE_USER_SUCCESS,
    result,
  };
};

const createUserFail = (result) => {
  return {
    type: actionType.CREATE_USER_FAIL,
    result,
  };
};

export const updateRoleUser = (data, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await updateRole(data);
      if (res && res.data && Object.keys(res.data).length > 0) dispath(updateRoleUserSuccess(res.data));
      else dispath(updateRoleUserFail(res.data));
    } catch (e) {
      dispath(updateRoleUserFail());
    }
  };
};

const updateRoleUserSuccess = (result) => {
  return {
    type: actionType.UPDATE_ROLE_SUCCESS,
    result,
  };
};

const updateRoleUserFail = (result) => {
  return {
    type: actionType.UPDATE_ROLE_FAIL,
    result,
  };
};

export const updateStatusUser = (data, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await updateStatus(data);
      if (res && res.data && Object.keys(res.data).length > 0) dispath(updateStatusUserSuccess(res.data));
      else dispath(updateStatusUserFail(res.data));
    } catch (e) {
      dispath(updateStatusUserFail());
    }
  };
};

const updateStatusUserSuccess = (result) => {
  return {
    type: actionType.UPDATE_STATUS_SUCCESS,
    result,
  };
};

const updateStatusUserFail = (result) => {
  return {
    type: actionType.UPDATE_STATUS_FAIL,
    result,
  };
};

export const editUserById = (data, id) => {
  return async (dispath, getstate) => {
    try {
      dispath(editUserByIdrSuccess(data, id));
    } catch (e) {
      dispath(editUserByIdFail());
    }
  };
};

const editUserByIdrSuccess = (data, id) => {
  return {
    type: actionType.EDIT_USER_BY_ID_SUCCESS,
    data,
    id,
  };
};

const editUserByIdFail = () => {
  return {
    type: actionType.EDIT_USER_BY_ID__FAIL,
  };
};

export const handleDeleteUser = (username, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await deleteUser({ username });

      if (res && res.data && Object.keys(res.data).length > 0) dispath(deleteSuccess(res.data));
      dispath(deleteFail(res.data));
    } catch (e) {
      dispath(deleteFail());
    }
  };
};

const deleteSuccess = (results) => {
  return {
    type: actionType.DELETE_USER_SUCCESS,
    results,
  };
};

const deleteFail = (results) => {
  return {
    type: actionType.DELETE_USER_FAIL,
    results,
  };
};

export const handleResetPassword = (username, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await resetPasswordUser({ username });

      if (res && res.data && Object.keys(res.data).length > 0) dispath(reserPasswordSuccess(res.data));
      dispath(resetPaswordFail(res.data));
    } catch (e) {
      dispath(resetPaswordFail());
    }
  };
};

const reserPasswordSuccess = (results) => {
  return {
    type: actionType.RESET_PASSWORD_SUCCESS,
    results,
  };
};

const resetPaswordFail = (results) => {
  return {
    type: actionType.RESET_PASSWORD_FAIL,
    results,
  };
};
