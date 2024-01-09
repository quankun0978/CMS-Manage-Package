import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
import "./ModalEditPackage.scss";
import * as actions from "../../../redux/store/actions/userActions";
const ModalEditPackage = (props) => {
  const { isModalOpen, showModal } = props;
  //hook
  const [validated, setValidated] = useState(false);
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
  };
  const handleSave = () => {
    toast.success("edit is success");
    showModal(false);
  };
  return (
    <>
      <Modal size="lg" show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" defaultValue="D7" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Type</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="0">0</option>
                  <option value="1">1</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Price</Form.Label>
                <Form.Control required type="text" defaultValue="7000" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="">
                <Form.Label>Cycle time</Form.Label>
                <Form.Control required defaultValue="1 ngày" />
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
    isModalOpen: state.user.isModalEditPackage,
  };
};
const mapDispathToProps = (dispath) => {
  return {
    showModal: (check) => dispath(actions.showModalEditPackage(check)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(ModalEditPackage);
