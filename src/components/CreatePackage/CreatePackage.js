import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
function CreatePackage() {
  const [validated, setValidated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) toast.success("Create package is success");
  };
  return (
    <div className="wrapper__create__user">
      <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3 align-items-center">
          <div className="col-auto ">
            <div className="Form__title__icon">
              <i className="fa-solid fa-sim-card"></i>
            </div>
          </div>
          <div className="col-auto p-0">
            <h4 className="header__info__bold  w-auto">Thêm mới gói cước</h4>
          </div>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6" controlId="">
            <Form.Label>Name</Form.Label>
            <Form.Control
              as={"input"}
              {...register("packagename", {
                required: true,
              })}
              type="text"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="">
            <Form.Label>Type</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="0">0</option>
              <option value="1">1</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            {errors.packagename && errors.packagename.type === "required" && (
              <span className="err__message">Package name is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6">
            {errors.email && errors.email.type === "required" && (
              <span className="err__message">Email is required</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="">
            <Form.Label>Price</Form.Label>
            <Form.Control
              as={"input"}
              {...register("price", {
                required: true,
                pattern: /^\d+$/,
              })}
              type="text"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="">
            <Form.Label>Cycle time</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            {errors.price && errors.price.type === "required" && (
              <span className="err__message">Price is required</span>
            )}
            {errors.price && errors.price.type === "pattern" && (
              <span className="err__message">Price is number</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="12" controlId="">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={7} />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group as={Col} md="12" controlId="">
            <button className="btn-primary btn">Thêm mới</button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

export default CreatePackage;
