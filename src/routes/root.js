import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "../auth/login";
import Home from "../components/home/Home";
import { connect } from "react-redux";
import * as actions from "../redux/store/actions/userActions";
const RouteLogin = (props) => {
  return (
    <>
      <Routes>
        <Route path="/dang-nhap" element={<Login></Login>}></Route>
        <Route path="*" element={<Navigate to="/dang-nhap"></Navigate>}></Route>
      </Routes>
    </>
  );
};
const Root = (props) => {
  let { isLogin } = props;
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
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    role: state.user.role,
  };
};
const mapDispathToProps = (dispath) => {
  return {
    checkLogin: (data) => dispath(actions.checkLogin(data)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Root);
