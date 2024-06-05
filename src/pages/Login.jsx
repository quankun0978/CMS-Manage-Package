import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Button, Form, Input, Col, Row } from 'antd';

import image from 'assets/img/background_login.png';
import logo from 'assets/img/logo_home.png';
import { PATH } from 'constants/consants';
import * as actions from 'store/actions/userActions';
import * as apiUser from 'api/apiUser';
// import * as actions1 from 'store/actions/adminActions';

import 'styles/login.scss';

const Login = () => {
  const navigate = useNavigate();
  let isLogin = useSelector((state) => state.user.isLogin);
  const [form] = Form.useForm();

  // hook
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isLogin, loading]);

  //handlep
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onFinish();
    }
  };

  const onFinish = async (values) => {
    setError('');
    setLoading(true);

    try {
      const data = await apiUser.checkLogin({ ...values, password: values.password });
      const token = data.data.result;
      if (token && token.access_token) {
        let decodeToken = jwtDecode(token.access_token);
        let time = new Date(decodeToken.exp * 1000);
        Cookies.set('token', token.access_token, { expires: time });
        localStorage.setItem('refresh_token', token.refresh_token);
        localStorage.setItem('username', decodeToken['autoflex-username']);
        sessionStorage.removeItem('username');
        setTimeout(() => {
          navigate(PATH.QUAN_LY_NGUOI_DUNG);
        }, 2000);
      }
    } catch (e) {
      if (e.response.data) {
        if (e.response.data === 'User is inactive') {
          sessionStorage.removeItem('username');
          setTimeout(() => {
            setError('Tài khoản hoặc mật khẩu không chính xác');
          }, 2000);
        }
        if (e.response.data === 'Request changing password') {
          sessionStorage.setItem('username', values.username);
          setTimeout(() => {
            navigate(PATH.CAP_NHAT_MAT_KHAU);
          }, 2000);
        }
      }
    }
  };

  return (
    <Row>
      <Col md={24}>
        <div className="wrapper-login">
          <div className="login">
            <div className="login-header">
              <div className="login-header-logo">
                <img className="logo" alt="" src={logo}></img>
              </div>
            </div>
            <div className="login-content">
              <Row>
                <Col sm={24} md={12}>
                  <div className="login-content-bandner">
                    <img className="bandner" alt=" " src={image}></img>
                  </div>
                </Col>

                <Col sm={24} md={12}>
                  <Row style={{ alignItems: 'center', marginBottom: '1rem' }}>
                    <Col>
                      <h4 className="title-bold " style={{ fontSize: '24px' }}>
                        Đăng nhập
                      </h4>{' '}
                    </Col>
                  </Row>

                  <Form className="login-content-form" form={form} name="login" onFinish={onFinish} scrollToFirstError layout="vertical">
                    <Form.Item
                      label="Email"
                      name="username"
                      validateTrigger="onSubmit"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không bỏ trống',
                        },
                      ]}>
                      <Input style={{ fontWeight: 'bold' }} size="large" placeholder="Enter username is format @vnpt.vn" />
                    </Form.Item>

                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không bỏ trống',
                        },
                      ]}
                      size="large"
                      placeholder="Enter the password"
                      validateTrigger="onSubmit"
                      label="Mật khẩu"
                      style={{ fontWeight: '700' }}
                      name="password">
                      <Input.Password size="large" placeholder="Enter the password" />
                    </Form.Item>
                    <Form.Item style={{ margin: '0', transform: 'translateY(-30px)' }}>
                      <div className="ant-form-item-explain-error">{error}</div>
                    </Form.Item>
                    <Form.Item>
                      <Button onKeyDown={handleKeyDown} size="large" className="login-content-button" type="primary" htmlType="submit">
                        Đăng nhập
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
            <div className="login-footer">
              <div>
                <small className="ml-4 ml-sm-5 mb-2">VNPT Vinaphone &copy; 2023| Tổng đài di động: 18001091 | Tổng đài Internet/MyTV: 18001166</small>
              </div>
            </div>
          </div>
          {loading && (
            <div className="Loading-toggle">
              <BeatLoader loading={loading} color="#3b5998" size={20} />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Login;
