import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from 'pages/Login';
import Home from 'pages/Home';
import { path } from 'constants/consants';
const RouteLogin = () => {
  return (
    <>
      <Routes>
        <Route path={path.DANG_NHAP} element={<Login></Login>} />
        <Route path="*" element={<Navigate to={path.DANG_NHAP}></Navigate>} />
      </Routes>
    </>
  );
};
const Root = () => {
  const navigate = useNavigate();
  let token = Cookies.get('token');
  let isLogin = useSelector((state) => state.user.isLogin);
  // hook
  useEffect(() => {}, []);
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
      navigate(path.DANG_NHAP);
    }
  }, [token]);
  return <>{view}</>;
};
export default Root;
