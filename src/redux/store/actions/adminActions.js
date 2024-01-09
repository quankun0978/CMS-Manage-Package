import actionType from "./actionstype";
import { getDataAllUser, getDataUserById } from "../../../api/Api";
export const showModalEditUser = (check) => {
  return {
    type: actionType.SHOW_MODAL_EDIT_USER,
    check: check,
  };
};
export const showModalDetailUser = (check) => {
  return {
    type: actionType.SHOW_MODAL_DETAIL_USER,
    check: check,
  };
};
export const getAllUser = () => {
  return async (dispath, getstate) => {
    try {
      let data = await getDataAllUser();
      if (data && data.data.length > 0) dispath(getAllUserSuccess(data.data));
      else dispath(getAllUserFail());
    } catch (e) {
      dispath(getAllUserFail());
    }
  };
};
const getAllUserSuccess = (data) => {
  return {
    type: actionType.GET_ALL_USER_SUCCESS,
    data,
  };
};
const getAllUserFail = () => {
  return {
    type: actionType.GET_ALL_USER_FAIL,
  };
};

export const getUserById = (id) => {
  return async (dispath, getstate) => {
    try {
      let data = await getDataUserById(id);
      if (data && Object.keys(data.data).length > 0)
        dispath(getUserByIdrSuccess(data.data));
      else dispath(getUserByIdFail());
    } catch (e) {
      dispath(getUserByIdFail());
    }
  };
};
const getUserByIdrSuccess = (data) => {
  return {
    type: actionType.GET_USER_BY_ID_SUCCESS,
    data,
  };
};
const getUserByIdFail = () => {
  return {
    type: actionType.GET_USER_BY_ID__FAIL,
  };
};

export const editUserById = (data, id) => {
  return async (dispath, getstate) => {
    try {
      // let data = await getDataUserById(id);
      // if (data && Object.keys(data.data).length > 0)
      dispath(editUserByIdrSuccess(data, id));

      //  dispath(editUserByIdFail());
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
