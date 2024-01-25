import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Button, Form, Input, Col, Row } from 'antd';

import image from 'assets/img/background_login.png';
import logo from 'assets/img/logo_home.png';
import * as actions from 'store/actions/userActions';
import 'styles/login.scss';

const Login = () => {
  const dispath = useDispatch();
  let isLogin = useSelector((state) => state.user.isLogin);
  const [form] = Form.useForm();
  const token = useSelector((state) => state.user.token);

  // hook
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isShowToast, setIsShowToast] = useState(false);

  useEffect(() => {
    if (isShowToast) {
      if (token && token.access_token) {
        let decodeToken = jwtDecode(token.access_token);
        let time = new Date(decodeToken.exp * 1000);
        Cookies.set('token', token.access_token, { expires: time });
        setError('');
      } else {
        setTimeout(() => {
          setError('Tài khoản hoặc mật khẩu không chính xác');
        }, 200);
      }
    }
  }, [isShowToast, token]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isLogin, loading]);

  //handle
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onFinish();
    }
  };

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      dispath(actions.checkLoginUser(values));
      setIsShowToast(true);
    }, 2000);
  };

  return (
    <>
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
                        <h4 className="title-bold   w-auto">Đăng nhập</h4>{' '}
                      </Col>
                    </Row>

                    <Form className="login-content-form" form={form} name="login" onFinish={onFinish} scrollToFirstError layout="vertical">
                      <Form.Item
                        label="Username"
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
                        label="Password"
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
    </>
  );
};

export default Login;
