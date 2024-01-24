import actionType from "../actions/actionstype";
const initApp = {
  isModalEditPackage: false,
  isModalDetailPackage: false,
  isLogin: false,
  token:""
};
export const userReducer = (state = initApp, actions) => {
  switch (actions.type) {
    case actionType.CHECK_ROLE:
      return {
        ...state,
        isModalEditPackage: actions.check,
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
