import React, { useEffect, useState, useRef } from 'react';
import { Layout, theme } from 'antd';
import './Home.scss';
import logo from 'assets/img/logo_home.png';
import Menu from 'components/Navigation/Navigation';
import HeaderDashBoard from 'components/header/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Admin from 'routes/admin';
import UserWrite from 'routes/user-write';
import UserRead from 'routes/user-read';
const { Content, Sider } = Layout;
const Home = () => {
  const count = useRef(0);
  const { isLogin, role } = useSelector((state) => ({
    isLogin: state.user.isLogin,
    role: state.user.role,
  }));
  // hook
  useEffect(() => {
    if (isLogin) {
      count.current++;
    }
    if (count.current === 1) toast.success('Login success');
  }, []);

  useEffect(() => {
    if (role) localStorage.setItem('role', role);
    if (localStorage.getItem('role') === 'admin') setComponent(<Admin />);
    if (localStorage.getItem('role') === 'user-write') setComponent(<UserWrite />);
    if (localStorage.getItem('role') === 'user-read') setComponent(<UserRead />);
  }, [role]);
  const [component, setComponent] = useState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div className="wrapper__sider">
        <Sider className="sider__main" breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => {}} onCollapse={(collapsed, type) => {}}>
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
