import React, { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Button, Col, Form, Input, Row } from 'antd';

import * as constants from 'constants/consants';
import * as apiUser from 'api/apiUser';
import 'styles/info.scss';
import { useSelector } from 'react-redux';
import { validatePassword } from 'ultils/validate';

const token = Cookies.get('token');

const DetailUser = () => {
  const [form] = Form.useForm();
  let dataDecode = useSelector((state) => state.user.dataDecode);
  // hook
  const [error, setError] = useState('');
  // const [dataDecode, setDataDecode] = useState({});

  useEffect(() => {
    if (Object.keys(dataDecode).length > 0) {
      let data = {
        username: dataDecode['autoflex-username'],
        role: dataDecode.autoflex_role,
      };
      form.setFieldsValue(data);
    }
  }, [dataDecode]);

  //handle
  const onFinish = async (values) => {
    try {
      const data = await apiUser.changePasswordUser({ username: values.username, old_password: values.passwordold, new_password: values.passwordnew, confirm_new_password: values.confirmPassword });

      if (data && data.data && data.data.result) {
        if (data.data.result === constants.STATUS.SUCCESS) {
          toast.success('Đổi mật khẩu thành công');
          setError('');
          form.setFieldsValue({ passwordnew: '', passwordold: '', confirmPassword: '' });
        } else {
          setError('Mật khẩu không chính xác');
          // toast.error('Mật khẩu không chính xác');
        }
      }
    } catch (e) {
      setError('Mật khẩu không chính xác');
    }
  };

  return (
    <div className="modal-detail-content h-100 ">
      <Row justify="space-between">
        <Col md={24}>
          <div className="modal-detail-info ">
            <Form onFinish={onFinish} name="register" layout="vertical" form={form}>
              <Row>
                <Col md={24}>
                  <div>
                    <Row justify="space-between">
                      <Col md={12}>
                        <Form.Item style={{ marginRight: '10px' }} label="Tên đăng nhập" name="username">
                          <Input disabled size="middle" />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item style={{ marginLeft: '10px' }} label="Quyền" name="role">
                          <Input disabled size="middle"></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <div className="change-password boder">
                    <h3 style={{ paddingBottom: '10px' }} className="title-bold">
                      Đổi mật khẩu
                    </h3>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không bỏ trống',
                        },
                      ]}
                      label="Mật khẩu cũ"
                      name="passwordold">
                      <Input.Password size="middle" />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không bỏ trống',
                        },
                        {
                          validator: validatePassword,
                        },
                      ]}
                      label="Mật khẩu mới"
                      name="passwordnew">
                      <Input.Password size="middle" />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không bỏ trống',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('passwordnew') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu nhập lại  không khớp'));
                          },
                        }),
                      ]}
                      label="Nhập lại mật khẩu mới"
                      name="confirmPassword">
                      <Input.Password size="middle" />
                    </Form.Item>
                    <Form.Item style={{ margin: '0', transform: 'translateY(-15px)' }}>
                      <div className="ant-form-item-explain-error">{error}</div>
                    </Form.Item>
                    <Row justify="end" style={{ gap: '10px' }}>
                      <Button htmlType="submit" type="primary">
                        Xác nhận
                      </Button>
                      <Button type="default">Hủy</Button>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default memo(DetailUser);
