// import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

// import Cookies from 'js-cookie';

// import Login from 'pages/Login';
// import Home from 'pages/Home';
// import { PATH } from 'constants/consants';

// const RouteLogin = () => {
//   return (
//     <Routes>
//       <Route path={PATH.DANG_NHAP} element={<Login />} />
//       <Route path="*" element={<Navigate to={PATH.DANG_NHAP} />} />
//     </Routes>
//   );
// };

// const Root = () => {
//   const token = Cookies.get('token');
//   const navigate = useNavigate();

//   return <>{token ? <Home /> : <RouteLogin />}</>;
// };

// export default Root;
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from 'pages/Login';
import Home from 'pages/Home';
import { PATH } from 'constants/consants';

const RouteLogin = () => {
  return (
    <Routes>
      <Route path={PATH.DANG_NHAP} element={<Login />} />
      <Route path="*" element={<Navigate to={PATH.DANG_NHAP} replace />} />
    </Routes>
  );
};

const Root = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(PATH.DANG_NHAP, { replace: true });
      window.location.reload()
    }
  }, [token, navigate]);

  return <>{token ? <Home /> : <RouteLogin />}</>;
};

export default Root;