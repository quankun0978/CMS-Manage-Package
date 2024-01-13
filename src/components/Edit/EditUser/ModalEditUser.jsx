import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Form, Input, Row, Select, Button, Modal } from 'antd';
import * as actions from '../../../redux/actions/adminActions';
import 'react-toastify/dist/ReactToastify.css';
import './modalEditUser.scss';
const ModalEdit = () => {
  const dispath = useDispatch();
  const [form] = Form.useForm();
  let { isModalOpen, dataUserById } = useSelector((state) => {
    return {
      isModalOpen: state.admin.isModalEditUser,
      dataUserById: state.admin.dataUserById,
    };
  });

  //hook

  useEffect(() => {
    form.resetFields();
    setTimeout(() => {
      form.setFieldsValue({ ...dataUserById, description: 'Xin chào các bạn ', role: 'User-read' });
    }, 1000);
  }, [dataUserById, form]);
  //handle
  const handleClose = () => {
    dispath(actions.showModalEditUser(false));
  };
  const handleSave = () => {
    dispath(actions.editUserById(form.getFieldValue(), form.getFieldValue().id));
    toast.success('edit is success');
    dispath(actions.showModalEditUser(false));
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        width={1000}
        title="Cập nhật thông tin người dùng"
        footer={() => {
          return (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </>
          );
        }}>
        <div style={{ marginTop: '15px' }}>
          <Form name="register" scrollToFirstError layout="vertical" form={form}>
            <Row justify="space-between">
              <Col md={12}>
                <Form.Item label="Username" name="username" style={{ marginRight: '10px' }}>
                  <Input disabled size="large" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item label="Email" name="email" style={{ marginLeft: '10px' }}>
                  <Input disabled size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col md={12}>
                <Form.Item label="Name" name="name" style={{ marginRight: '10px' }}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item label="Password" name="password" style={{ marginLeft: '10px' }}>
                  <Input disabled size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col md={12}>
                <Form.Item name="phone" label="Phone Number" style={{ marginRight: '10px' }}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item style={{ marginLeft: '10px' }} label="Role" name="role">
                  <Select size="large" allowClear>
                    <Select.Option value="1">User-read</Select.Option>
                    <Select.Option value="2">User-write</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col md={24}>
                <Form.Item name="description" label="Description">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalEdit;
