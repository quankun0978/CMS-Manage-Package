import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../DetailUser/DetailUser"
import * as actions from "../../../redux/store/actions/adminActions";
import { path } from "../../../ultils/constants/path";
const DetailPackage = () => {
  let stateRedux = useSelector((state) => {
    return {
      dataUserById: state.admin.dataUserById,
    };
  });
  let dispath = useDispatch()
  let { dataUserById } = stateRedux;
  //hook 
  let { id } = useParams();
  const navigate = useNavigate();
  const [dataDetail, setDataDetail] = useState({});
  const [check, setCheck] = useState(false);
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    dispath(actions.getUserById(id))
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setCheck(true);
    }, 1000);
    if (check) setDataDetail(dataUserById);
  }, [dataUserById, check]);

  // handle
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const handleClose = () => {
    setDataDetail({});
    navigate(path.DANH_SACH_GOI_CUOC);
  };
  return (
    <>
      <div className="modal__detail__content h-100 ">
        <div className="detail__back  pb-3">
          <p onClick={handleClose}>
            <i class="fa-solid fa-angle-left pe-1"></i>
            Quay lại
          </p>
        </div>
        <div className="row justify-content-between ">
          <div className="col-3">
            <div className="modal__detail__img ">
              <div className="modal__detail__img__main">
                <i className="fa-solid fa-sim-card"></i>
              </div>
              <div className="modal__detail__more">
                <div className="modal__detail__more__info mb-3 mt-2 ">
                  <h3 className="mb-2">Trạng thái</h3>
                  <div className="modal__detail__more__info__icon">
                    <p className="m-0">Enable</p>
                  </div>
                </div>
                <div className="modal__detail__more__info">
                  <h3 className="mb-2">Số người đăng dã đăng ký</h3>
                  <div className="modal__detail__more__info__icon">
                    <p className="m-0">100M+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="modal__detail__info ">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={
                        dataDetail && dataDetail.name ? dataDetail.name : ""
                      }
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Type</Form.Label>
                    <Form.Control required type="password" disabled />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={
                        dataDetail && dataDetail.phone ? dataDetail.phone : ""
                      }
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Cycle time</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={
                        dataDetail && dataDetail.phone ? dataDetail.phone : ""
                      }
                      disabled
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      disabled
                      as="textarea"
                      placeholder="Xin chào các bạn"
                      rows={4}
                    />
                  </Form.Group>
                </Row>
                <Row className="h-110"></Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailPackage;