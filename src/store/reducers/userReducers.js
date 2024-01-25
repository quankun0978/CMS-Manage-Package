import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

import actionType from '../actions/actionstype';

const initUser = {
  isModalCreatePackage: false,
  isModalEditPackage: false,
  isModalDetailPackage: false,
  isModalDeletePackage: false,
  isModalChangeStatus: false,
  isLogin: false,
  dataListPackage: [],
  dataPackageByPackagecode: {},
  dataDecode: {},
  resultCreate: {},
  resultDeletePackage: {},
  resultUpdatePackage: {},
  resultEnablePackage: {},
  resultDisablePackage: {},
  resultChangepassword: {},
  resultChangeStatusPackage: {},
  token: '',
  totalPackage: 0,
  actionUser: '',
};

export const userReducer = (state = initUser, actions) => {
  switch (actions.type) {
    case actionType.SHOW_MODAL_CREATE_PACKAGE:
      return {
        ...state,
        isModalCreatePackage: actions.check,
      };

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
      
    case actionType.SHOW_MODAL_DELETE_PACKAGE:
      return {
        ...state,
        isModalDeletePackage: actions.check,
      };
      
    case actionType.SHOW_MODAL_CHANGE_STATUS:
      return {
        ...state,
        isModalChangeStatus: actions.check,
      };
      
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        token: actions.token,
      };
      
    case actionType.LOGIN_FAIL:
      return {
        ...state,
        isLogin: false,
      };
      
    case actionType.GET_LIST_PACKAGE_SUCCESS:
      return {
        ...state,
        dataListPackage: actions.data,
      };
      
    case actionType.GET_LIST_PACKGAGE_FAIL:
      return {
        ...state,
      };
      
    case actionType.GET_PACKAGE_BY_PACKAGECODE:
      let data = state.dataListPackage;
      let dataPackageByPackagecode = data.find((item) => item.code === actions.packagecode);
      return {
        ...state,
        dataPackageByPackagecode: dataPackageByPackagecode,
      };
      
    case actionType.GET_DATA_DECODE:
      let dataDecode = jwtDecode(Cookies.get('token'));
      return {
        ...state,
        dataDecode,
      };
      

    case actionType.CREATE_PACKAGE_SUCCESS:
      return {
        ...state,
        resultCreate: actions.result,
      };
      
    case actionType.CREATE_PACKAGE_FAIL:
      return {
        ...state,
        resultCreate: actions.result,
      };
      
    case actionType.UPDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        resultUpdatePackage: actions.result,
      };
      
    case actionType.UPDATE_ROLE_FAIL:
      return {
        ...state,
        resultUpdatePackage: actions.result,
      };
      
    case actionType.DELETE_PACKAGE_BY_CODE_SUCCESS:
      return {
        ...state,
        resultDeletePackage: actions.results,
      };
      
    case actionType.DELETE_PACKAGE_BY_CODE_FAIL:
      return {
        ...state,
        resultDeletePackage: actions.results,
      };
      
    case actionType.ENABLE_PACKAGE_SUCCESS:
      return {
        ...state,
        resultEnablePackage: actions.results,
      };
      
    case actionType.ENABLE_PACKAGE_FAIL:
      return {
        ...state,
        resultEnablePackage: actions.results,
      };
      
    case actionType.DISABLE_PACKAGE_SUCCESS:
      return {
        ...state,
        resultDisablePackage: actions.results,
      };
      
    case actionType.DISABLE_PACKAGE_FAIL:
      return {
        ...state,
        resultDisablePackage: actions.results,
      };
      
    case actionType.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        resultChangepassword: actions.results,
      };
      
    case actionType.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        resultChangepassword: actions.results,
      };
      
    case actionType.CHANGE_STATUS_PACKAGE_SUCCESS:
      return {
        ...state,
        resultChangeStatusPackage: actions.results,
      };
      
    case actionType.CHANGE_STATUS_PACKAGE_FAIL:
      return {
        ...state,
        resultChangeStatusPackage: actions.results,
      };
      
    case actionType.GET_ACTION_USER:
      return {
        ...state,
        actionUser: actions.action,
      };
      
    default:
      return state;
  }
};
