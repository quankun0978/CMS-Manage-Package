import actionType from "../actions/actionstype";
const initAdmin = {
  isModalEditUser: false,
  isModalDetailUser: false,
  dataAllUser: [],
  dataUserById: {},
};
export const adminReducer = (state = initAdmin, actions) => {
  switch (actions.type) {
    case actionType.SHOW_MODAL_EDIT_USER:
      return {
        ...state,
        isModalEditUser: actions.check,
      };
    case actionType.SHOW_MODAL_DETAIL_USER:
      return {
        ...state,
        isModalDetailUser: actions.check,
      };
    case actionType.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        dataAllUser: actions.data,
      };
    case actionType.GET_ALL_USER_FAIL:
      return {
        ...state,
      };
    case actionType.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        dataUserById: actions.data,
      };
    case actionType.GET_USER_BY_ID__FAIL:
      return {
        ...state,
      };
    case actionType.EDIT_USER_BY_ID_SUCCESS:
      let dt = [...state.dataAllUser];
      let dtUpdate = dt.map((item) => {
        if (item.id === actions.id) return actions.data;
        else return item;
      });
      return {
        ...state,
        dataUserById: actions.data,
        dataAllUser: dtUpdate,
      };
    case actionType.EDIT_USER_BY_ID__FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

// import { createSlice } from "@reduxjs/toolkit";
// export const adminReducer = createSlice({
//   name: "admin",
//   initialState: {
//     isModalEditUser: false,
//     isModalDetailUser: false,
//     dataAllUser: [],
//     dataUserById: {},
//   },
//   reducers: {
//     ShowModalEditUser: (state, actions) => {
//       state.isModalEditUser = actions.check;
//     },
//     ShowModalDetailUser: (state, actions) => {
//       state.isModalDetailUser = actions.check;
//     },
//     getAllUserSuccess: (state, actions) => {
//       state.dataAllUser = actions.data;
//     },

//     getUserByIdSuccess: (state, actions) => {
//       state.dataUserById = actions.data;
//     },
//     editUserByIdSuccess: (state, actions) => {
//       let dt = [...state.dataAllUser];
//       let dtUpdate = dt.map((item) => {
//         if (item.id === actions.id) return actions.data;
//         else return item;
//       });
//       state.dataUserById = actions.data;
//       state.dataAllUser = dtUpdate;
//     },
//   },
// });
// // export const {
// //   ShowModalDetailPackage,
// //   ShowModalEditPackage,
// //   LoginFail,
// //   LoginSuccess,
// // } = adminReducer.actions;
// export default adminReducer.reducer;
