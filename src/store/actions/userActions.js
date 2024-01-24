import md5 from 'md5';
import { changePasswordUser, checkLogin } from 'api/apiUser';
import { createNewPackage, deletePackageByCode, disablePackage, enablePackage, getListPackage, updatePackage } from 'api/apiPackage';
import actionType from './actionstype';
import * as convert from 'ultils/convert';
import { status } from 'constants/consants';
export const showModalEditPackage = (check) => {
  return {
    type: actionType.SHOW_MODAL_EDIT_PACKAGE,
    check: check,
  };
};
export const showModalCreatePackage = (check) => {
  return {
    type: actionType.SHOW_MODAL_CREATE_PACKAGE,
    check: check,
  };
};
export const showModalDetailPackage = (check) => {
  return {
    type: actionType.SHOW_MODAL_DETAIL_PACKAGE,
    check: check,
  };
};
export const showModalDeletePackage = (check) => {
  return {
    type: actionType.SHOW_MODAL_DELETE_PACKAGE,
    check: check,
  };
};
export const showModalChangeStatus = (check) => {
  return {
    type: actionType.SHOW_MODAL_CHANGE_STATUS,
    check: check,
  };
};

export const checkLoginUser = (data) => {
  return async (dispath, getstate) => {
    try {
      let dt = { username: data.username, password: md5(data.password) };
      let res = await checkLogin(JSON.stringify(dt));
      if (res && res.data && res.data.result && res.data.result) dispath(loginSuccess(res.data.result));
    } catch (e) {
      dispath(loginFail());
    }
  };
};
export const loginSuccess = (token) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    token,
  };
};
export const loginFail = () => {
  return {
    type: actionType.LOGIN_FAIL,
  };
};

export const getDataListPackage = (token) => {
  return async (dispath, getstate) => {
    try {
      let data = await getListPackage(token);
      let dt = data.data.result.map((item) => {
        return {
          ...item,
          status: convert.convertStatus(item.status),
          cycle: convert.convertCycle(item.cycle),
        };
      });
      if (dt && dt.length > 0) dispath(getListPackageSuccess(dt));
      else dispath(getListPackageFail());
    } catch (e) {
      dispath(getListPackageFail());
    }
  };
};
const getListPackageSuccess = (data) => {
  return {
    type: actionType.GET_LIST_PACKAGE_SUCCESS,
    data,
  };
};
const getListPackageFail = () => {
  return {
    type: actionType.GET_LIST_PACKGAGE_FAIL,
  };
};
export const getPackageByPackageCode = (packagecode) => {
  return {
    type: actionType.GET_PACKAGE_BY_PACKAGECODE,
    packagecode,
  };
};
export const getDataDecode = () => {
  return {
    type: actionType.GET_DATA_DECODE,
  };
};
export const getTotalPackage = () => {
  return {
    type: actionType.GET_TOTAL_PACKAGE,
  };
};
export const getActionUser = (action) => {
  return {
    type: actionType.GET_ACTION_USER,
    action,
  };
};
export const createPackage = (data, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await createNewPackage(data, token);
      if (res && res.data && Object.keys(res.data).length > 0) dispath(createPackageSuccess(res.data));
      else dispath(createPackageFail(res.data));
    } catch (e) {
      dispath(createPackageFail({ result: 'FAIL' }));
    }
  };
};
const createPackageSuccess = (result) => {
  return {
    type: actionType.CREATE_PACKAGE_SUCCESS,
    result,
  };
};
const createPackageFail = (result) => {
  return {
    type: actionType.CREATE_PACKAGE_FAIL,
    result,
  };
};

export const handleUpdatePackage = (data, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await updatePackage(data, token);
      if (res && res.data && Object.keys(res.data).length > 0) dispath(updatePackageSuccess(res.data));
      else dispath(updatePackageFail(res.data));
    } catch (e) {
      dispath(updatePackageFail({ result: 'FAIL' }));
    }
  };
};
const updatePackageSuccess = (result) => {
  return {
    type: actionType.UPDATE_PACKAGE_SUCCESS,
    result,
  };
};
const updatePackageFail = (result) => {
  return {
    type: actionType.UPDATE_PACKAGE_FAIL,
    result,
  };
};
export const handleDeletePackage = (packagecode, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await deletePackageByCode({ package_code: packagecode }, token);

      if (res && res.data && Object.keys(res.data).length > 0) dispath(deletePackageSuccess(res.data));
      dispath(deletePackageFail(res.data));
    } catch (e) {
      dispath(deletePackageFail({ result: 'FAIL' }));
    }
  };
};

const deletePackageSuccess = (results) => {
  return {
    type: actionType.DELETE_PACKAGE_BY_CODE_SUCCESS,
    results,
  };
};
const deletePackageFail = (results) => {
  return {
    type: actionType.DELETE_PACKAGE_BY_CODE_FAIL,
    results,
  };
};

export const handleEnablePackage = (packagecode, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await enablePackage({ package_code: packagecode }, token);

      if (res && res.data && Object.keys(res.data).length > 0) dispath(enablePackageSuccess(res.data));
      dispath(enablePackageFail(res.data));
    } catch (e) {
      dispath(enablePackageFail({ result: 'FAIL' }));
    }
  };
};

const enablePackageSuccess = (results) => {
  return {
    type: actionType.ENABLE_PACKAGE_SUCCESS,
    results,
  };
};
const enablePackageFail = (results) => {
  return {
    type: actionType.ENABLE_PACKAGE_FAIL,
    results,
  };
};

export const handleDisablePackage = (packagecode, token) => {
  return async (dispath, getstate) => {
    try {
      let res = await disablePackage({ package_code: packagecode }, token);

      if (res && res.data && Object.keys(res.data).length > 0) dispath(disablePackageSuccess(res.data));
      dispath(disablePackageFail(res.data));
    } catch (e) {
      dispath(disablePackageFail({ result: 'FAIL' }));
    }
  };
};

const disablePackageSuccess = (results) => {
  return {
    type: actionType.ENABLE_PACKAGE_SUCCESS,
    results,
  };
};
const disablePackageFail = (results) => {
  return {
    type: actionType.ENABLE_PACKAGE_FAIL,
    results,
  };
};

export const handleChangeStatusPackage = (packagecode, token, statusPackage) => {
  return async (dispath, getstate) => {
    try {
      let res;
      if (statusPackage === status.ACTIVE) {
        res = await enablePackage({ package_code: packagecode }, token);
      }
      if (statusPackage === status.INACTIVE) {
        res = await disablePackage({ package_code: packagecode }, token);
      }

      if (res && res.data && Object.keys(res.data).length > 0) {
        dispath(changeStatusPackageSuccess(res.data));
      } else {
        dispath(changeStatusPackageFail(res.data));
      }
    } catch (e) {
      dispath(changeStatusPackageFail({ result: 'FAIL' }));
    }
  };
};

const changeStatusPackageSuccess = (results) => {
  return {
    type: actionType.CHANGE_STATUS_PACKAGE_SUCCESS,
    results,
  };
};
const changeStatusPackageFail = (results) => {
  return {
    type: actionType.CHANGE_STATUS_PACKAGE_FAIL,
    results,
  };
};

export const handleChangePassword = (data, token) => {
  return async (dispath, getstate) => {
    try {
      let dt = {
        username: data.username,
        old_password: md5(data.passwordold),
        new_password: md5(data.passwordnew),
        confirm_new_password: md5(data.confirmPassword),
      };
      let res = await changePasswordUser(dt, token);

      if (res && res.data && Object.keys(res.data).length > 0) dispath(changePasswordSuccess(res.data));
      dispath(changePaswordFail(res.data));
    } catch (e) {
      dispath(changePaswordFail({ result: 'FAIL' }));
    }
  };
};

const changePasswordSuccess = (results) => {
  return {
    type: actionType.CHANGE_PASSWORD_SUCCESS,
    results,
  };
};
const changePaswordFail = (results) => {
  return {
    type: actionType.CHANGE_PASSWORD_FAIL,
    results,
  };
};

// const getErrorLogin = (results) => {
//   return {
//     type: actionType.CHANGE_PASSWORD_FAIL,
//     results,
//   };
// };
