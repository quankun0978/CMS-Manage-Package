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

