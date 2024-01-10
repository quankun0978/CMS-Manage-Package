import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./DetailUser.scss";
import * as actions from "../../../redux/store/actions/adminActions";
import { path } from "../../../ultils/constants/path";
const DetailUser = () => {
  let stateRedux = useSelector((state) => {
    return {
      isModalOpen: state.admin.isModalDetailUser,
      dataUserById: state.admin.dataUserById,
    };
  });
  let dispath = useDispatch()
  let { dataUserById } = stateRedux;
  // hook
  let { id } = useParams();
  const [dataDetail, setDataDetail] = useState({});
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
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
    navigate(path.DANH_SACH_NGUOI_DUNG);
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
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="modal__detail__more">
                <div className="modal__detail__more__info mb-3 mt-2 ">
                  <h3 className="mb-2">Trạng thái</h3>
                  <div className="modal__detail__more__info__icon">
                    <p className="m-0">Enable</p>
                  </div>
                </div>
                <div className="modal__detail__more__info">
                  <h3 className="mb-2">Thời gian đăng nhập gần nhất</h3>
                  <div className="modal__detail__more__info__icon">
                    <p className="m-0">4 giờ trước</p>
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
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={
                        dataDetail && dataDetail.username
                          ? dataDetail.username
                          : ""
                      }
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        aria-describedby="inputGroupPrepend"
                        required
                        disabled
                        defaultValue={
                          dataDetail && dataDetail.email ? dataDetail.email : ""
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" disabled />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Phone number</Form.Label>
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
                    <Form.Label>Role</Form.Label>
                    <Form.Select disabled aria-label="Default select example">
                      <option value="1">User-read</option>
                      <option value="2">User-write</option>
                    </Form.Select>
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailUser;