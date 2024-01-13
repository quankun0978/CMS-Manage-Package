import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { Button, Form, Input, Col, Row } from 'antd';
import image from 'assets/img/uNGdWHi.png';
import logo from 'assets/img/logo_home.png';
import * as actions from '../../../redux/actions/userActions';
import './login.scss';
const Login = () => {
  const dispath = useDispatch();
  const [form] = Form.useForm();
  // hook
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [loading]);
  //handle
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onFinish();
    }
  };
  const onFinish = (values) => {
    console.log(values);
    if (Object.keys(values).length > 0) {
      setLoading(true);
      setTimeout(() => {
        dispath(actions.checkLogin(values));
      }, 3000);
    }
  };
  return (
    <>
      <div className="wrapper__login">
        <div className="login">
          <div className="login__header">
            <div className="login__header__logo">
              <img className="logo" alt="" src={logo}></img>
            </div>
          </div>
          <div className="login__content">
            <Row>
              <Col md={12}>
                <div className="login__content__bandner">
                  <img className="bandner" alt=" " src={image}></img>
                </div>
              </Col>

              <Col md={12}>
                <Row style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
                  <Col> </Col>{' '}
                  <Col>
                    <h4 className="title-bold   w-auto">Đăng nhập</h4>{' '}
                  </Col>
                </Row>
                <Form className="login__content__form" form={form} name="login" onFinish={onFinish} scrollToFirstError layout="vertical">
                  <Row justify="space-between">
                    <Col md={24}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng không bỏ trống',
                          },
                        ]}>
                        <Input style={{ fontWeight: 'bold' }} size="large" placeholder="Enter email is format @vnpt.vn" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="space-between">
                    <Col md={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng không bỏ trống',
                          },
                        ]}
                        size="large"
                        placeholder="Enter the password"
                        label="Password"
                        name="password">
                        <Input.Password size="large" placeholder="Enter the password" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="space-between">
                    <Col md={24}>
                      <Form.Item>
                        <Button onKeyDown={handleKeyDown} size="large" className="login__content__button" type="primary" htmlType="submit">
                          Đăng nhập
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          <div className="login__footer">
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
      <ToastContainer></ToastContainer>
    </>
  );
};
export default Login;
