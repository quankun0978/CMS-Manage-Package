import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Col, Form, Input, Row } from 'antd';
import { validatePassword } from 'ultils/validate';
import * as apiUser from 'api/apiUser';
import * as constants from 'constants/consants';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'constants/consants';

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');
  const [error, setError] = useState('');
  useEffect(() => {
    if (!username) {
      navigate(PATH.DANG_NHAP);
    }
  }, [username]);

  const onFinish = async (values) => {
    try {
      const data = await apiUser.updatePassword({ username: sessionStorage.getItem('username'), old_password: values.passwordold, new_password: values.passwordnew, confirm_new_password: values.confirmPassword });
      if (data && data.data && data.data.result) {
        if (data.data.result === constants.STATUS.SUCCESS) {
          toast.success('Cập nhật mật khẩu thành công');
          setError('');
          form.setFieldsValue({ passwordnew: '', passwordold: '', confirmPassword: '' });
          navigate(PATH.DANG_NHAP);
        } else {
          setError('Mật khẩu không chính xác');
          // toast.error('Mật khẩu không chính xác');
        }
      }
    } catch (e) {
      setError('Mật khẩu không chính xác');
    }
  };
  const handleRedirect = () => {
    navigate(PATH.DANG_NHAP);
    sessionStorage.removeItem('username');
  };
  return (
    <div className="modal-detail-content  " style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Row justify="space-between " style={{ width: '600px' }}>
        <Col md={24}>
          <div className="modal-detail-info ">
            <Form onFinish={onFinish} name="register" layout="vertical" form={form}>
              <h2 style={{ textAlign: 'center', padding: '12px 0', fontWeight: 'bold' }}>Vui lòng cập nhật mật khẩu</h2>
              <Row>
                <Col md={24}>
                  <div className="change-password boder">
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
                    <Form.Item style={{ margin: '0', transform: 'translateY(-10px)' }}>
                      <div className="ant-form-item-explain-error">{error}</div>
                    </Form.Item>
                    <Row justify="end" style={{ gap: '10px' }}>
                      <Button htmlType="submit" type="primary">
                        Xác nhận
                      </Button>
                      <Button type="default" onClick={handleRedirect}>
                        Hủy
                      </Button>
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

export default UpdatePassword;
