import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import Admin from 'routes/admin';
import UserWrite from 'routes/user-write';
import UserRead from 'routes/user-read';

import { MenuAdmin, MenuUserRead, MenuUserWrite } from 'ultils/menuNav';
import * as constants from 'constants/consants';
import Cookies from 'js-cookie';

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
