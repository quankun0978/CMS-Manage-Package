import React from 'react';
import Admin from 'routes/admin';
import UserWrite from 'routes/user-write';
import UserRead from 'routes/user-read';
import { MenuAdmin, MenuUserRead, MenuUserWrite } from 'ultils/menuNav';
import { jwtDecode } from 'jwt-decode';
export const menu = (token) => {
  let menu = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    switch (decodedToken.autoflex_role) {
      case 'ADMIN':
        menu = MenuAdmin;
        break;

      case 'WRITE':
        menu = MenuUserWrite;
        break;

      case 'READ':
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
      case 'ADMIN':
        component = <Admin />;
        break;

      case 'WRITE':
        component = <UserWrite />;
        break;

      case 'READ':
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
      case 'READ':
        isShowToast = false;
        break;
      default:
        break;
    }
  }
  return isShowToast;
};
