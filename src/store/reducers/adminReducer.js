import actionType from 'store/actions/actionstype';
const initAdmin = {
  isModalEditUser: false,
  isModalDeleteUser: false,
  isModalDetailUser: false,
  isModalResetPassword: false,
  isModalCreateUser: false,
  dataListUser: [],
  dataUserByUsername: {},
  dataUserById: {},
  resultCreate: {},
  resultUpdateRole: {},
  resultUpdateStatus: {},
  resultDeleteUser: {},
  resultResetPassword: {},
};
export const adminReducer = (state = initAdmin, actions) => {
  switch (actions.type) {
    case actionType.SHOW_MODAL_EDIT_USER:
      return {
        ...state,
        isModalEditUser: actions.check,
      };
    case actionType.SHOW_MODAL_DELETE_USER:
      return {
        ...state,
        isModalDeleteUser: actions.check,
      };
    case actionType.SHOW_MODAL_RESET_PASSWORD:
      return {
        ...state,
        isModalResetPassword: actions.check,
      };
    case actionType.SHOW_MODAL_CREATE_USER:
      return {
        ...state,
        isModalCreateUser: actions.check,
      };
    case actionType.SHOW_MODAL_DETAIL_USER:
      return {
        ...state,
        isModalDetailUser: actions.check,
      };
    case actionType.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        dataListUser: actions.data,
      };
    case actionType.GET_LIST_USER_FAIL:
      return {
        ...state,
      };

    case actionType.GET_USER_BY_USERNAME:
      let data = state.dataListUser;
      let dataUserByUsername = data.find((item) => item.username === actions.username);
      return {
        ...state,
        dataUserByUsername: dataUserByUsername,
      };

    case actionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        resultCreate: actions.result,
      };
    case actionType.CREATE_USER_FAIL:
      return {
        ...state,
        resultCreate: actions.result,
      };
    case actionType.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        resultUpdateRole: actions.result,
      };
    case actionType.UPDATE_ROLE_FAIL:
      return {
        ...state,
        resultUpdateRole: actions.result,
      };
    case actionType.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        resultUpdateStatus: actions.result,
      };
    case actionType.UPDATE_STATUS_FAIL:
      return {
        ...state,
        resultUpdateStatus: actions.result,
      };
    case actionType.EDIT_USER_BY_ID_SUCCESS:
      let dt = [...state.dataListUser];
      let dtUpdate = dt.map((item) => {
        if (item.id === actions.id) return actions.data;
        else return item;
      });
      return {
        ...state,
        dataUserById: actions.data,
        dataListUser: dtUpdate,
      };
    case actionType.EDIT_USER_BY_ID__FAIL:
      return {
        ...state,
      };
    case actionType.DELETE_USER_SUCCESS:
      return {
        ...state,
        resultDeleteUser: actions.results,
      };
    case actionType.DELETE_USER_FAIL:
      return {
        ...state,
        resultDeleteUser: actions.results,
      };
    case actionType.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resultResetPassword: actions.results,
      };
    case actionType.RESET_PASSWORD_FAIL:
      return {
        ...state,
        resultResetPassword: actions.results,
      };
    default:
      return state;
  }
};
