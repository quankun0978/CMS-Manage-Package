import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Layout, theme } from 'antd';
import HeaderDashBoard from 'components/header/Header';
import { Component } from 'store/actions/appActions';
import logo from 'assets/img/logo_home.png';
import Menu from 'components/Navigation/Navigation';
import 'styles/home.scss';
const { Content, Sider } = Layout;
const Home = () => {
  let token = Cookies.get('token');
  let isLogin = useSelector((state) => state.user.isLogin);
  // hook
  const count = useRef(0);
  const [component, setComponent] = useState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    if (isLogin) count.current++;
    if (count.current === 1) toast.success('Đăng nhập thành công');
  }, []);

  useEffect(() => {
    if (token) {
      setComponent(Component(token));
    }
  }, [token]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div className="wrapper-sider">
        <Sider width={250} className="sider-main" breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => {}} onCollapse={(collapsed, type) => {}}>
          <div className="demo-logo-vertical" />
          <div className="logo">
            <img alt=" " src={logo} />
          </div>
          <Menu />
        </Sider>
      </div>
      <Layout>
        <HeaderDashBoard />
        <Content
          style={{
            backgroundColor: '#fff',
            margin: '10px 16px ',
            padding: '10px',
            borderRadius: '8px',
          }}>
          <div
            style={{
              padding: ' 0',
              height: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            {component && component}
          </div>
        </Content>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default Home;
