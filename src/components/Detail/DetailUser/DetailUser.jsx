import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Input, Row, Select } from 'antd';
import { path } from 'constants/path';
import * as actions from '../../../redux/actions/adminActions';
import './DetailUser.scss';
const DetailUser = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  let dispath = useDispatch();
  let { dataUserById } = useSelector((state) => {
    return {
      isModalOpen: state.admin.isModalDetailUser,
      dataUserById: state.admin.dataUserById,
    };
  });

  // hook
  const [dataDetail, setDataDetail] = useState({});
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispath(actions.getUserById(id));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setCheck(true);
    }, 1000);
    if (check) {
      form.setFieldsValue({ ...dataUserById, description: 'Xin chào các bạn', role: 'User-read' });
    }
  }, [check]);
  // handle
  const handleClose = () => {
    setDataDetail({});
    navigate(path.DANH_SACH_NGUOI_DUNG);
  };
  return (
    <>
      <div className="modal__detail__content h-100 ">
        <div style={{ paddingBottom: '1.5rem' }} className="detail__back  ">
          <p onClick={handleClose}>
            <i class="fa-solid fa-angle-left " style={{ paddingRight: '1rem' }}></i>
            Quay lại
          </p>
        </div>
        <Row justify="space-between">
          <Col md={6}>
            <div className="modal__detail__img ">
              <div className="modal__detail__img__main">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="modal__detail__more">
                <div className="modal__detail__more__info  " style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Trạng thái</h3>
                  <div className="modal__detail__more__info__icon">
                    <p className="m-0">Enable</p>
                  </div>
                </div>
                <div className="modal__detail__more__info">
                  <h3 style={{ marginBottom: '1rem' }}>Thời gian đăng nhập gần nhất</h3>
                  <div className="modal__detail__more__info__icon">
                    <p style={{ margin: '0' }}>4 giờ trước</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={18}>
            <div className="modal__detail__info " style={{ marginLeft: '20px' }}>
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
                      <Input disabled size="large" />
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
                      <Input disabled size="large" />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item style={{ marginLeft: '10px' }} label="Role" name="role">
                      <Select size="large" disabled allowClear>
                        <Select.Option value="1">User-read</Select.Option>
                        <Select.Option value="2">User-write</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col md={24}>
                    <Form.Item name="description" label="Description">
                      <Input.TextArea disabled rows={4} />
                    </Form.Item>
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

export default DetailUser;
