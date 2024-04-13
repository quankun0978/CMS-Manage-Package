import { PATH } from 'constants/consants';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Login from 'pages/Login';
import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router';

import * as constants from 'constants/consants';

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const { component } = props;
  const token = Cookies.get('token');

  const [role, setRole] = useState();

  useEffect(() => {
    if (!token && !localStorage.getItem('username') && !localStorage.getItem('refresh_token')) {
      navigate(PATH.DANG_NHAP);
    }
    // if (token) {
    //   const decodedToken = jwtDecode(token);
    //   if (decodedToken.autoflex_role) {
    //     setRole(decodedToken.autoflex_role);
    //   }
    // }
  }, [navigate, token]);

 

  return <>{component && component}</>;
};

export const PrivateRoute1 = (props) => {
  const navigate = useNavigate();
  const { component } = props;
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  return <>{component && component}</>;
};

export default PrivateRoute;
