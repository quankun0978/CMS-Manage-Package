import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import Login from 'pages/Login';
import Home from 'pages/Home';
import { PATH } from 'constants/consants';

const RouteLogin = () => {
  return (
    <>
      <Routes>
        <Route path={PATH.DANG_NHAP} element={<Login></Login>} />
        <Route path="*" element={<Navigate to={PATH.DANG_NHAP}></Navigate>} />
      </Routes>
    </>
  );
};

const Root = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  let isLogin = useSelector((state) => state.user.isLogin);

  // hook

  useEffect(() => {
    if (isLogin) {
      setView(<Home></Home>);
    }
  }, [isLogin]);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (token) setView(<Home></Home>);
    else {
      setView(<RouteLogin></RouteLogin>);
      navigate(PATH.DANG_NHAP);
    }
  }, [token]);

  return <>{view}</>;
};

export default Root;
