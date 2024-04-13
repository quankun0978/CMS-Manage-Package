import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from 'pages/Login';
import Home from 'pages/Home';
import { PATH } from 'constants/consants';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { refreshToken } from 'api/apiUser';
import { BeatLoader } from 'react-spinners';
import AppRouter from './AppRouter';

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
  const [token1, setToken1] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     handldeAwait();
  //     handleRefreshToken();1
  //   }
  // }, [token]);
  // const handldeAwait = async () => {
  //   setLoading(true);
  // };
  // const handleRefreshToken = async () => {
  //   const refresh_Token = localStorage.getItem('refresh_token');
  //   const username = localStorage.getItem('username');
  //   if (refresh_Token && username) {
  //     try {
  //       setLoading(false);
  //       const response = await refreshToken({ username: username, refresh_token: refresh_Token });
  //       console.log(response);
  //       const { result } = response.data;
  //       let expirationTime = Math.floor(Date.now() / 1000) + 60; // Set expiration to 1 minute from now
  //       let time = new Date(expirationTime * 1000);
  //       Cookies.set('token', result.access_token, { expires: time });
  //       localStorage.setItem('refresh_token', result.refresh_token);
  //       // Đợi 1 giây trước khi tái tải trang
  //       window.location.reload();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  return <>{token ? <AppRouter /> : <RouteLogin />}</>;
};

export default Root;
