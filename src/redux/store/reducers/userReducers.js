import actionType from "../actions/actionstype";
const initUser = {
  isModalEditPackage: false,
  isModalDetailPackage: false,
  isLogin: false,
  role: "",
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
      return {
        ...state,
        isLogin: true,
        role: actions.role,
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
// import { createSlice } from "@reduxjs/toolkit";
// export const userReducer = createSlice({
//   name: "user",
//   user: {
//     isModalEditPackage: false,
//     isModalDetailPackage: false,
//     isLogin: false,
//     role: "",
//   },
//   reducers: {
//     ShowModalEditPackage: (state, actions) => {
//       state.isModalEditPackage = actions.check;
//     },
//     ShowModalDetailPackage: (state, actions) => {
//       state.isModalDetailPackage = actions.check;
//     },
//     LoginSuccess: (state, actions) => {
//       state.isLogin = true;
//       state.role = actions.role;
//     },
//     LoginFail: (state, actions) => {
//       state.isLogin = false;
//     },
//   },
// });
// export const {
//   ShowModalDetailPackage,
//   ShowModalEditPackage,
//   LoginFail,
//   LoginSuccess,
// } = userReducer.actions;
// export default userReducer.reducer;
