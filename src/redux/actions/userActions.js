import actionType from './actionstype';
export const showModalEditPackage = (check) => {
  return {
    type: actionType.SHOW_MODAL_EDIT_PACKAGE,
    check: check,
  };
};
export const showModalDetailPackage = (check) => {
  return {
    type: actionType.SHOW_MODAL_DETAIL_PACKAGE,
    check: check,
  };
};
export const checkLogin = (data) => {
  return (dispath, getstate) => {
    try {
      if (data.email === 'admin@vnpt.vn') {
        if (data.password === '123456') {
          dispath(loginSuccess('admin'));
        } else {
          dispath(loginFail());
        }
      } else {
        dispath(loginFail());
      }
      if (data.email === 'userRead@vnpt.vn') {
        if (data.password === '123456') {
          dispath(loginSuccess('user-read'));
        } else {
          dispath(loginFail());
        }
      }
      if (data.email === 'userWrite@vnpt.vn') {
        if (data.password === '123456') {
          dispath(loginSuccess('user-write'));
        } else {
          dispath(loginFail());
        }
      }
      if (data.email === '') {
        if (data.password === '') {
          dispath(loginFail());
        }
      }
    } catch (e) {
      dispath(loginFail());
    }
  };
};
export const loginSuccess = (role) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    role,
  };
};
export const loginFail = () => {
  return {
    type: actionType.LOGIN_FAIL,
  };
};
