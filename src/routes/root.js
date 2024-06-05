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

  return <>{token ? <AppRouter /> : <RouteLogin />}</>;
};

export default Root;
