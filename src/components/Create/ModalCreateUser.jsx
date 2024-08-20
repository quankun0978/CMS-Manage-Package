import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import Cookies from 'js-cookie';
import { Button, Col, Form, Input, Row, Select, Modal } from 'antd';

import { validateEmail } from 'ultils/validate';
import * as actions from 'store/actions/adminActions';
import * as constants from 'constants/consants';
import * as apiUser from 'api/apiUser';
import { CheckCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/es/modal/confirm';

const ModalCreateUser = ({ isModalOpen, setIsShowModal }) => {
  const dispath = useDispatch();
  const token = Cookies.get('token');
  const [form] = Form.useForm();

  // handle
  const onFinish = async (values) => {
    try {
      const data = await apiUser.createNewUser(values);

      if (data && data.data && data.data.result && data.data.result.result) {
        if (data.data.result.result === constants.STATUS.SUCCESS) {
          showPassword(values.username, data.data.result.password);
          setIsShowModal(false);
          form.resetFields();
          dispath(actions.getDataListUser(token));
        } else {
          toast.error('Người dùng đã tồn tại');
        }
      }
    } catch (e) {
      toast.error('Người dùng đã tồn tại');
    }
  };

  const handleClose = () => {
    setIsShowModal(false);
    form.resetFields();
  };
  const handleCreate = () => {
    form.submit();
  };

  const showPassword = (username, password) => {
    const confirmRef = confirm({
      width: 500,
      icon: <CheckCircleOutlined size={20} style={{ color: 'rgb(95, 199, 146)' }} />,
      title: 'Mật khẩu',
      content: (
        <div>
          <h6 style={{ fontWeight: 500 }}>
            Mật khẩu của tài khoản <span>{username}</span> là
          </h6>
          <h6 style={{ fontWeight: 600 }}>{password}</h6>
        </div>
      ),

      footer: () => (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Button onClick={() => confirmRef.destroy()}>Xác nhận</Button>
        </div>
      ),
    });
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
export default memo(ModalCreateUser);
