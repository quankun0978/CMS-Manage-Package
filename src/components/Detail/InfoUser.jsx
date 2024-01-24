import React, { memo, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import * as actions from 'store/actions/userActions';
import 'styles/info.scss';
const DetailUser = () => {
  const [form] = Form.useForm();
  let dispath = useDispatch();

  let dataDecode = useSelector((state) => state.user.dataDecode);
  let resultChangepassword = useSelector((state) => state.user.resultChangepassword);
  let token = Cookies.get('token');
  // hook
  const [error, setError] = useState('');
  const [isShowToast, setIsShowToast] = useState(false);
  useEffect(() => {
    dispath(actions.getDataDecode());
  }, []);
  useEffect(() => {
    if (Object.keys(dataDecode).length > 0) {
      let data = {
        username: dataDecode['autoflex-username'],
        role: dataDecode.autoflex_role,
      };
      form.setFieldsValue(data);
    }
  }, [dataDecode]);

  useEffect(() => {
    if (isShowToast) {
      if (resultChangepassword && resultChangepassword.result === 'SUCCESS') {
        setError('');
        toast.success('Đổi mật khẩu thành công');
      }
      if ((resultChangepassword && Object.keys(resultChangepassword).length > 0 && resultChangepassword.result === 'FAIL') || resultChangepassword.error) {
        setError('Mật khẩu không chính xác');
      }
    }
  }, [dispath, form, isShowToast, resultChangepassword, token]);
  //handle
  const onFinish = (values) => {
    dispath(actions.handleChangePassword(values, token));
    setIsShowToast(true);
    form.setFieldsValue({ passwordnew: '', passwordold: '', confirmPassword: '' });
  };

  return (
    <>
      <div className="modal-detail-content h-100 ">
        <Row justify="space-between">
          <Col md={24}>
            <div className="modal-detail-info ">
              <Form onFinish={onFinish} name="register" scrollToFirstError layout="vertical" form={form}>
                <Row>
                  <Col md={24}>
                    <div className="">
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
    </>
  );
};

export default memo(DetailUser);
