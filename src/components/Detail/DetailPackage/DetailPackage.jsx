import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Input, Row, Select } from 'antd';
import * as actions from '../../../redux/actions/adminActions';
import { path } from 'constants/path';
import 'components/Detail/DetailUser/DetailUser.scss';
const DetailPackage = () => {
  const [form] = Form.useForm();
  let { id } = useParams();
  let dispath = useDispatch();
  const navigate = useNavigate();
  //hook
  const [dataDetail, setDataDetail] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    dispath(actions.getUserById(id));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setCheck(true);
    }, 1000);
    if (check)
      form.setFieldsValue({
        name: 'D7',
        price: '7000',
        cycle: '1 ngày',
        type: '0',
        description: 'Xin chào các bạn',
      });
  }, [check]);

  // handle

  const handleClose = () => {
    setDataDetail({});
    navigate(path.DANH_SACH_GOI_CUOC);
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
                <i className="fa-solid fa-sim-card"></i>
              </div>
              <div className="modal__detail__more">
                <div className="modal__detail__more__info " style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Trạng thái</h3>
                  <div className="modal__detail__more__info__icon">
                    <p style={{ margin: '0' }}>Enable</p>
                  </div>
                </div>
                <div className="modal__detail__more__info">
                  <h3 className="mb-2">Số người đăng dã đăng ký</h3>
                  <div className="modal__detail__more__info__icon">
                    <p style={{ margin: '0' }}>100M+</p>
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
                    <Form.Item label="Name" name="name" style={{ marginRight: '10px' }}>
                      <Input disabled size="large" />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item label="Price" name="price" style={{ marginLeft: '10px' }}>
                      <Input disabled size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-between">
                  <Col md={12}>
                    <Form.Item name="cycle" label="Cycle time" style={{ marginRight: '10px' }}>
                      <Input disabled size="large" />
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
                      <Input.TextArea disabled rows={7} />
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
export default DetailPackage;
