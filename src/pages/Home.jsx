import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { Layout, theme } from 'antd';
import Cookies from 'js-cookie';

import HeaderDashBoard from 'components/header/Header';

import logo from 'assets/img/logo_home.png';
import Menu from 'components/Navigation/Navigation';
import * as actions from 'store/actions/adminActions';

import 'styles/home.scss';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const Home = () => {
  let isLogin = useSelector((state) => state.user.isLogin);

  // hook
  const count = useRef(0);
  const dispath = useDispatch();
  const token = Cookies.get('token');

  // const [component, setComponent] = useState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (isLogin) count.current++;
    if (count.current === 1) toast.success('Đăng nhập thành công');
  }, []);
  useEffect(() => {
    dispath(actions.getDataListUser(token));
  }, [dispath, token]);

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
            <Outlet />
          </div>
        </Content>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default Home;
