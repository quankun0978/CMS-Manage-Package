import React, { useEffect, useRef, useState } from "react";
import { Layout, theme } from "antd";
import "./Home.scss";
import logo from "../../assets/img/logo_home.png";
import Menu from "../navigation/navigation";
import HeaderDashBoard from "../header/header";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import Admin from "../../routes/admin";
import UserWrite from "../../routes/user-write";
import UserRead from "../../routes/user-read";
import * as actions from "../../redux/store/actions/userActions";
const { Content, Sider } = Layout;
const Home = (props) => {
  let { isLogin, role } = props;
  const [component, setComponent] = useState();
  const count = useRef(0);
  useEffect(() => {
    if (isLogin) {
      count.current++;
    }
    if (count.current === 1) toast.success("Login success");
  }, []);
  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    if (localStorage.getItem("role") === "admin") setComponent(<Admin></Admin>);
    if (localStorage.getItem("role") === "user-write")
      setComponent(<UserWrite></UserWrite>);
      if (localStorage.getItem("role") === "user-read")
      setComponent(<UserRead></UserRead>);
  }, [role]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      {
        <Layout style={{ minHeight: "100vh" }}>
          <div className="wrapper__sider">
            <Sider
              className="sider__main"
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {}}
              onCollapse={(collapsed, type) => {}}
            >
              <div className="demo-logo-vertical" />
              <div className="logo">
                <img alt=" " src={logo}></img>
              </div>
              <Menu></Menu>
            </Sider>
          </div>
          <Layout>
            <HeaderDashBoard></HeaderDashBoard>
            <Content
              style={{
                backgroundColor: "#fff",
                margin: "10px 16px ",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  padding: " 0",
                  height: "100%",

                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {component && component}
              </div>
            </Content>
          </Layout>
          <ToastContainer />
        </Layout>
      }
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    role: state.user.role,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    checkLogin: (data) => dispath(actions.checkLogin(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
