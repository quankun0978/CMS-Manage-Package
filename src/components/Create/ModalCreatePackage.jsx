import { memo } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';
import { Button, Col, Form, Input, Row, Select, Modal } from 'antd';

import * as actions from 'store/actions/userActions';
import * as constants from 'constants/consants';
import * as apiPackage from 'api/apiPackage';
import { validateCycle, validatePrice } from 'ultils/validate';

const CreatePackage = ({ isModalOpen, setIsShowModal }) => {
  const token = Cookies.get('token');
  const [form] = Form.useForm();
  const dispath = useDispatch();

  //hook

  // handle
  const onFinish = async (values) => {
    try {
      const data = await apiPackage.createNewPackage({ ...values, price: +values.price, status: constants.STATUS.ACTIVE }, token);

      if (data && data.data && data.data.result) {
        if (data.data.result === constants.STATUS.SUCCESS) {
          toast.success('Thêm mới thành công');
          setIsShowModal(false);
          form.resetFields();
          dispath(actions.getDataListPackage(token));
        } else {
          toast.success('Thêm mới không thành công');
        }
      }
    } catch (e) {
      toast.error('Gói cước đã tồn tại');
    }
  };
  const handleCreate = () => {
    form.submit();
  };
  const handleClose = () => {
    setIsShowModal(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        width={1000}
        title="Thêm mới gói cước"
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
              type: constants.TYPE.DATA,
              provider: constants.PROVIDER.IT,
              status: constants.STATUS.ACTIVE,
            }}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical">
            <Row justify="space-between">
              <Col md={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống',
                    },
                  ]}
                  label="Mã gói cước"
                  name="code"
                  style={{ marginRight: '10px' }}>
                  <Input size="middle" placeholder="Mã gói cước" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item style={{ marginLeft: '10px' }} label="Type" name="type">
                  <Select size="middle">
                    <Select.Option value="DATA">Data</Select.Option>
                  </Select>
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
                  style={{ marginLeft: '10px' }}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống',
                    },
                  ]}
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
                <Form.Item
                  name="description"
                  label="Mô tả"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không bỏ trống',
                    },
                  ]}>
                  <Input.TextArea placeholder="Mô tả" rows={4} />
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
export default memo(CreatePackage);
