import React from 'react';
import { jwtDecode } from 'jwt-decode';

import Admin from 'routes/admin';
import UserWrite from 'routes/user-write';
import UserRead from 'routes/user-read';

import { MenuAdmin, MenuUserRead, MenuUserWrite } from 'ultils/menuNav';
import * as constants from 'constants/consants';

export const menu = (token) => {
  let menu = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    switch (decodedToken.autoflex_role) {
      case constants.ROLE.ADMIN:
        menu = MenuAdmin;
        break;

      case constants.ROLE.WRITE:
        menu = MenuUserWrite;
        break;

      case constants.ROLE.READ:
        menu = MenuUserRead;
        break;
      default:
        break;
    }
  }
  return menu;
};

export const Component = (token) => {
  let component = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    switch (decodedToken.autoflex_role) {
      case constants.ROLE.ADMIN:
        component = <Admin />;
        break;

      case constants.ROLE.WRITE:
        component = <UserWrite />;
        break;

      case constants.ROLE.READ:
        component = <UserRead />;
        break;
      default:
        break;
    }
  }
  return component;
};

export const hasOperationFull = (token) => {
  let isShowToast = true;
  if (token) {
    const decodedToken = jwtDecode(token);
    switch (decodedToken.autoflex_role) {
      case constants.ROLE.READ:
        isShowToast = false;
        break;
      default:
        break;
    }
  }
  return isShowToast;
};
