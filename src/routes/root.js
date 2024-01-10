import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login/auth/Login";
import Home from "../pages/Home/Home";
import { path } from "../ultils/constants/path";
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
  let stateRedux = useSelector((state) => {
    return {
      isLogin: state.user.isLogin,
    };
  });
  let { isLogin } = stateRedux;
  // hook
  const [view, setView] = useState(null);
  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("isLogin", isLogin);
    }
    if (!localStorage.getItem("isLogin")) setView(<RouteLogin></RouteLogin>);
    else {
      setView(<Home></Home>);
    }
  }, [isLogin]);
  return <>{view}</>;
};
export default Root;
