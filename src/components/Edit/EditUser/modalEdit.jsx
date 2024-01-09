import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./modalEdit.scss";
import * as actions from "../../../redux/store/actions/adminActions";
import "react-toastify/dist/ReactToastify.css";
const ModalEdit = (props) => {
  const { isModalOpen, showModal, dataUserById, editDataUser } = props;
  const Inputs = {
    UserName: useRef(),
    Name: useRef(),
    Phone: useRef(),
  };
  //hook
  const [validated, setValidated] = useState(false);
  const [dataUser, setDataUser] = useState({});
  useEffect(() => {
    setDataUser(dataUserById);
  }, []);
  useEffect(() => {
    setDataUser(dataUserById);
  }, [dataUserById]);
  //handle
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const handleClose = () => {
    showModal(false);
    setDataUser({});
  };
  const handleSave = () => {
    let dt = {
      ...dataUser,
      name: Inputs.Name.current.value,
      phone: Inputs.Phone.current.value,
    };
    editDataUser(dt, dataUser.id);
    toast.success("edit is success");
    showModal(false);
  };
  return (
    <>
      <Modal size="lg" show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton style={{}}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={
                    dataUser && dataUser.username && dataUser.username
                  }
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    required
                    disabled
                    defaultValue={dataUser && dataUser.email && dataUser.email}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  ref={Inputs.Name}
                  defaultValue={dataUser && dataUser.name && dataUser.name}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" disabled />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  required
                  ref={Inputs.Phone}
                  type="text"
                  defaultValue={dataUser && dataUser.phone && dataUser.phone}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Role</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">User-read</option>
                  <option value="2">User-write</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isModalOpen: state.admin.isModalEditUser,
    dataUserById: state.admin.dataUserById,
  };
};
const mapDispathToProps = (dispath) => {
  return {
    showModal: (check) => dispath(actions.showModalEditUser(check)),
    editDataUser: (data, id) => dispath(actions.editUserById(data, id)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(ModalEdit);
