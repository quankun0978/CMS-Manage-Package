import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { Layout, theme } from 'antd';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import HeaderDashBoard from 'components/header/Header';
import Admin from 'routes/admin';
import UserRead from 'routes/user-read';
import UserWrite from 'routes/user-write';

import logo from 'assets/img/logo_home.png';
import Menu from 'components/Navigation/Navigation';
import * as constants from 'constants/consants';
import 'styles/home.scss';
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

const Home = () => {
  let isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();
  // hook
  const count = useRef(0);
  const token = Cookies.get('token');
  const [role, setRole] = useState();

  // const [component, setComponent] = useState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (isLogin) count.current++;
    if (count.current === 1) toast.success('Đăng nhập thành công');
  
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.autoflex_role) {
        setRole(decodedToken.autoflex_role);
      }
    }
   
  }, [token]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div className="wrapper-sider">
        <Sider width={250} className="sider-main" breakpoint="lg" collapsedWidth="0">
          <div className="demo-logo-vertical" />
          <div className="logo">
            <img alt="" src={logo} />
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
            {role && role === constants.ROLE.ADMIN && <Admin />}
            {role && role === constants.ROLE.WRITE && <UserWrite />}
            {role && role === constants.ROLE.READ && <UserRead />}
          </div>
        </Content>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default Home;
