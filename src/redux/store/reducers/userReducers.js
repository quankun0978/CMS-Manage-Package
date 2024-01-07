import actionType from "../actions/actionstype";
const initUser = {
  isModalEditPackage: false,
  isModalDetailPackage: false,
  isLogin: false,
  role:""
};
export const userReducer = (state = initUser, actions) => {
  switch (actions.type) {
    case actionType.SHOW_MODAL_EDIT_PACKAGE:
      return {
        ...state,
        isModalEditPackage: actions.check,
      };
    case actionType.SHOW_MODAL_DETAIL_PACKAGE:
      return {
        ...state,
        isModalDetailPackage: actions.check,
      };
    case actionType.LOGIN_SUCCESS:
      console.log(actions)
      return {
        ...state,
        isLogin: true,
        role:actions.role
      };
    case actionType.LOGIN_FAIL:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};
