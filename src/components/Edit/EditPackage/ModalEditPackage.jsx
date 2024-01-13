import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Form, Input, Row, Select, Button, Modal } from 'antd';
import * as actions from '../../../redux/actions/userActions';
import 'react-toastify/dist/ReactToastify.css';
const ModalEditPackage = () => {
  let dispath = useDispatch();
  const [form] = Form.useForm();
  let { isModalOpen } = useSelector((state) => {
    return {
      isModalOpen: state.user.isModalEditPackage,
    };
  });

  //hook
  useEffect(() => {
    form.resetFields();
    setTimeout(() => {
      form.setFieldsValue({
        name: 'D7',
        price: '7000',
        cycle: '1 ngày',
        type: '0',
        description: 'Xin chào các bạn',
      });
    }, 1000);
  }, [form]);
  //handle

  const handleClose = () => {
    dispath(actions.showModalEditPackage(false));
  };
  const handleSave = () => {
    // dispath(actions.editUserById(form.getFieldValue(), form.getFieldValue().id));
    toast.success('edit is success');
    dispath(actions.showModalEditPackage(false));
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        width={1000}
        title="Cập nhật thông tin gói cước"
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
                <Form.Item label="Name" name="name" style={{ marginRight: '10px' }}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item label="Price" name="price" style={{ marginLeft: '10px' }}>
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col md={12}>
                <Form.Item name="cycle" label="Cycle time" style={{ marginRight: '10px' }}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item style={{ marginLeft: '10px' }} label="Type" name="type">
                  <Select size="large" disabled allowClear>
                    <Select.Option value="0">1</Select.Option>
                    <Select.Option value="1">0</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col md={24}>
                <Form.Item name="description" label="Description">
                  <Input.TextArea rows={7} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalEditPackage;
