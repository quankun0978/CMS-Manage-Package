import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Col, Form, Input, Row, Select, Button, Modal } from 'antd';

import * as constants from 'constants/consants';
import * as actions from 'store/actions/userActions';
import * as apiPackage from 'api/apiPackage';
import { validatePrice, validateCycle } from 'ultils/validate';
import 'react-toastify/dist/ReactToastify.css';

const token = Cookies.get('token');

const ModalEditPackage = ({ dataPackageByPackagecode, isModalOpen, setIsShowModal }) => {
  let dispath = useDispatch();
  const [form] = Form.useForm();

  //hook

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      form.resetFields();
      form.setFieldsValue(dataPackageByPackagecode);
    }
  }, [dataPackageByPackagecode]);

  //handle
  const onFinish = async (values) => {
    try {
      const data = await apiPackage.updatePackage({ ...values, price: +values.price, status: constants.STATUS.ACTIVE });

      if (data && data.data && data.data.result) {
        if (data.data.result === constants.STATUS.SUCCESS) {
          toast.success('Cập nhật thành công');
          setIsShowModal(false);
          form.resetFields();
          dispath(actions.getDataListPackage(token));
        } else {
          toast.success('Cập nhật không thành công');
        }
      }
    } catch (e) {
      toast.error('Cập nhật không thành công');
    }
  };

  const handleClose = () => {
    setIsShowModal(false);
  };

  const handleSave = () => {
    form.submit();
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleClose}
      width={1000}
      title="Cập nhật thông tin gói cước"
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
        <Form
          onFinish={onFinish}
          initialValues={{
            provider: constants.PROVIDER.IT,
            status: constants.STATUS.ACTIVE,
          }}
          form={form}
          name="update"
          scrollToFirstError
          layout="vertical">
          <Row justify="space-between">
            <Col md={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                ]}
                label="Mã gói cước"
                name="code">
                <Input disabled size="middle" placeholder="Mã gói cước" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Item style={{ marginRight: '10px' }} label="Nhà cung cấp" name="provider">
                <Select size="middle">
                  <Select.Option value="IT">IT</Select.Option>
                  <Select.Option value="MBG">MBG</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                ]}
                style={{ marginLeft: '10px' }}
                name="title"
                label="Tiêu đề">
                <Input placeholder="Tiêu đề " />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                  {
                    validator: validatePrice,
                  },
                ]}
                label="Giá gói cước"
                name="price"
                style={{ marginRight: '10px' }}>
                <Input size="middle" placeholder="Giá gói cước" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label="Thời hạn"
                name="cycle"
                style={{ marginLeft: '10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                  {
                    validator: validateCycle,
                  },
                ]}>
                <Input size="middle" placeholder="eg :1D 2M , 3Y" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between"></Row>
          <Row justify="space-between">
            <Col md={24}>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea placeholder="Mô tả" rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(ModalEditPackage);
