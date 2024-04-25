import React, { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Col, Form, Input, Row, Select, Button, Modal } from 'antd';

import * as actions from 'store/actions/adminActions';
import * as constants from 'constants/consants';
import * as apiUser from 'api/apiUser';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/modalEdit.scss';

const token = Cookies.get('token');

const ModalEdit = ({ dataUserByUsername, setIsShowModal, isModalOpen }) => {
  const dispath = useDispatch();
  const [form] = Form.useForm();

  //hook

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      form.resetFields();
      form.setFieldsValue(dataUserByUsername);
    }
  }, [dataUserByUsername]);

  //handle
  const handleClose = () => {
    setIsShowModal(false);
  };
  const handleSave = async () => {
    try {
      const dataRole = await apiUser.updateRole({ username: form.getFieldValue().username, role: form.getFieldValue().role }, token);
      const dataStatus = await apiUser.updateStatus({ username: form.getFieldValue().username, status: form.getFieldValue().status }, token);

      if (dataRole && dataStatus && dataRole.data && dataStatus.data && dataRole.data.result && dataStatus.data.result) {
        if (dataRole.data.result === constants.STATUS.SUCCESS && dataStatus.data.result === constants.STATUS.SUCCESS) {
          toast.success('Cập nhật thành công');
          setIsShowModal(false);
          form.resetFields();
          dispath(actions.getDataListUser(token));
        } else {
          toast.error('Cập nhật không thành công');
        }
      }
    } catch (e) {
      toast.error('Cập nhật không thành công');
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleClose}
      width={700}
      title="Cập nhật thông tin người dùng"
      footer={() => {
        return (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Cập nhật
            </Button>
          </>
        );
      }}>
      <div style={{ marginTop: '15px' }}>
        <Form name="update" layout="vertical" form={form}>
          <Row justify="space-between">
            <Col md={24}>
              <Form.Item label="Tên đăng nhập" name="username">
                <Input disabled size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={24}>
              <Form.Item label="Trạng thái" name="status">
                <Select size="large">
                  <Select.Option value={constants.STATUS.ACTIVE}>Kích hoạt</Select.Option>
                  <Select.Option value={constants.STATUS.INACTIVE}>Chưa kích hoạt</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col md={24}>
              <Form.Item label="Quyền" name="role">
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
  );
};

export default memo(ModalEdit);
