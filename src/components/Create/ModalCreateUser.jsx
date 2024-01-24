import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { Button, Col, Form, Input, Row, Select, Modal } from 'antd';
import { validateEmail } from 'ultils/validate';
import * as actions from 'store/actions/adminActions';
function ModalCreateUser() {
  const dispath = useDispatch();
  const token = Cookies.get('token');
  const [form] = Form.useForm();
  const [isShowToast, setIsShowToast] = useState(false);
  let isModalOpen = useSelector((state) => state.admin.isModalCreateUser);
  let resultCreate = useSelector((state) => state.admin.resultCreate);

  //hook
  useEffect(() => {
    if (isShowToast) {
      if (resultCreate.error || resultCreate.result === 'FAIL') {
        toast.error('Thêm mới không  thành công');
        setIsShowToast(false);
      }
      if (resultCreate.result === 'SUCCESS') {
        toast.success('Thêm mới  thành công');
        dispath(actions.showModalCreateUser(false));
        form.resetFields();
        dispath(actions.getDataListUser(token));
        setIsShowToast(false);
      }
    }
  }, [dispath, form, isShowToast, resultCreate.error, resultCreate.result, token]);
  // handle
  const onFinish = (values) => {};
  const handleCreate = useCallback(() => {
    form.submit();
    dispath(actions.createUser(form.getFieldValue(), token));
    setIsShowToast(true);
  }, [dispath, form, token]);
  const handleClose = () => {
    dispath(actions.showModalCreateUser(false));
    form.resetFields();
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
              role: 'ADMIN',
            }}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical">
            <Row justify="space-between">
              <Col md={24}>
                <Form.Item
                  label="Tên đăng nhập"
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
                  <Input size="large" placeholder="Tên đăng nhập" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col md={24}>
                <Form.Item name="role" label="Quyền">
                  <Select size="large">
                    <Select.Option value="ADMIN">ADMIN</Select.Option>
                    <Select.Option value="WRITE">WRITE</Select.Option>
                    <Select.Option value="READ">READ</Select.Option>
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
}
export default ModalCreateUser;
