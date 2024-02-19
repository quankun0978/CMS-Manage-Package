import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import Cookies from 'js-cookie';
import { Button, Col, Form, Input, Row, Select, Modal } from 'antd';

import { validateEmail } from 'ultils/validate';
import * as actions from 'store/actions/adminActions';
import * as constants from 'constants/consants';

const ModalCreateUser = () => {
  const dispath = useDispatch();
  const token = Cookies.get('token');
  const [form] = Form.useForm();
  const [isShowToast, setIsShowToast] = useState(false);
  let isModalOpen = useSelector((state) => state.admin.isModalCreateUser);
  let resultCreate = useSelector((state) => state.admin.resultCreate);

  //hook
  useEffect(() => {
    if (isShowToast) {
      if (resultCreate.error || resultCreate.result === constants.STATUS.FAIL) {
        toast.error('Tên đăng nhập đã tồn tại');
        setIsShowToast(false);
      }
      if (resultCreate.result === constants.STATUS.SUCCESS) {
        toast.success('Thêm mới  thành công');
        dispath(actions.showModalCreateUser(false));
        form.resetFields();
        dispath(actions.getDataListUser(token));
        setIsShowToast(false);
      }
    }
  }, [dispath, form, isShowToast, resultCreate.error, resultCreate.result, token]);

  // handle
  const onFinish = (values) => {
    dispath(actions.createUser(values, token));
    setIsShowToast(true);
  };

  const handleClose = () => {
    dispath(actions.showModalCreateUser(false));
    form.resetFields();
  };
  const handleCreate = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        width={700}
        title="Thêm mới người dùng"
        footer={() => {
          return (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button htmlType="submit" variant="primary" onClick={handleCreate}>
                Thêm mới
              </Button>
            </>
          );
        }}>
        <div style={{ marginTop: '15px' }}>
          <Form
            initialValues={{
              username: '',
              role: constants.ROLE.ADMIN,
            }}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical">
            <Row justify="space-between">
              <Col md={24}>
                <Form.Item
                  label="Email"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống',
                    },
                    {
                      validator: validateEmail,
                    },
                  ]}>
                  <Input size="large" placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col md={24}>
                <Form.Item name="role" label="Quyền">
                  <Select size="large">
                    <Select.Option value={constants.ROLE.ADMIN}>{constants.ROLE.ADMIN}</Select.Option>
                    <Select.Option value={constants.ROLE.WRITE}>{constants.ROLE.WRITE}</Select.Option>
                    <Select.Option value={constants.ROLE.READ}>{constants.ROLE.READ}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>

      <ToastContainer></ToastContainer>
    </>
  );
};
export default ModalCreateUser;
