import React, { useEffect, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Col, Form, Input, Row, Select, Button, Modal } from 'antd';
import * as actions from 'store/actions/adminActions';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/modalEdit.scss';
const ModalEdit = () => {
  const dispath = useDispatch();
  let token = Cookies.get('token');
  const [form] = Form.useForm();

  let isModalOpen = useSelector((state) => state.admin.isModalEditUser);
  let dataUserByUsername = useSelector((state) => state.admin.dataUserByUsername);
  let resultUpdateRole = useSelector((state) => state.admin.resultUpdateRole);
  let resultUpdateStatus = useSelector((state) => state.admin.resultUpdateStatus);
  //hook
  const [isShowToast, setIsShowToast] = useState(false);
  useEffect(() => {
    form.resetFields();
    setTimeout(() => {
      form.setFieldsValue(dataUserByUsername);
    }, 1000);
  }, [dataUserByUsername]);

  useEffect(() => {
    if (isShowToast) {
      if (resultUpdateRole.error || resultUpdateRole.result === 'FAIL' || resultUpdateStatus.error || resultUpdateStatus.result === 'FAIL') {
        toast.error('Cập nhật không  thành công');
        setIsShowToast(false);
      }
      if (resultUpdateRole.result === 'SUCCESS' && resultUpdateStatus.result === 'SUCCESS') {
        toast.success('Cập nhật  thành công');
        dispath(actions.showModalEditUser(false));
        form.resetFields();
        dispath(actions.getDataListUser(token));
        setIsShowToast(false);
      }
    }
  }, [dispath, form, isShowToast, resultUpdateRole.error, resultUpdateRole.result, resultUpdateStatus.error, resultUpdateStatus.result, token]);
  //handle
  const handleClose = () => {
    dispath(actions.showModalEditUser(false));
  };
  const handleSave = () => {
    dispath(actions.updateRoleUser({ username: form.getFieldValue().username, role: form.getFieldValue().role }, token));
    dispath(actions.updateStatusUser({ username: form.getFieldValue().username, status: form.getFieldValue().status }, token));
    setIsShowToast(true);
  };
  return (
    <>
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
                    <Select.Option value="ACTIVE">Kích hoạt</Select.Option>
                    <Select.Option value="INACTIVE">Chưa kích hoạt</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between">
              <Col md={24}>
                <Form.Item label="Quyền" name="role">
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
    </>
  );
};
export default memo(ModalEdit);
