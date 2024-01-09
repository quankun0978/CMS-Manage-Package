import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./CreateUser.scss";
function CreateUser() {
  // hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // handle
  const onSubmit = (data) => {
    if (data) toast.success("Create user is success");
  };
  return (
    <div className="wrapper__create__user">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3 align-items-center">
          <div className="col-auto ">
            <div className="Form__title__icon">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
          <div className="col-auto p-0">
            <h4 className="header__info__bold  w-auto">Thêm mới người dùng</h4>
          </div>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Username</Form.Label>
            <Form.Control
              as={"input"}
              {...register("username", {
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              })}
              type="text"
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                as={"input"}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                type="text"
                aria-describedby="inputGroupPrepend"
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="">
          <Form.Group as={Col} md="6">
            {errors.username && errors.username.type === "required" && (
              <span className="err__message">User name is required</span>
            )}

            {errors?.username?.type === "pattern" && (
              <span className="err__message">Username is invalid</span>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6">
            {errors.email && errors.email.type === "required" && (
              <span className="err__message">Email is required</span>
            )}

            {errors?.email?.type === "pattern" && (
              <span className="err__message">Email is invalid</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Name</Form.Label>
            <Form.Control
              as={"input"}
              {...register("name", {
                required: true,
              })}
              type="text"
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Password</Form.Label>
            <Form.Control
              as={"input"}
              {...register("password", {
                required: true,
                minLength: 8,
              })}
              type="password"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            {errors.name && errors.name.type === "required" && (
              <span className="err__message">Name is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6">
            {errors.password && errors.password.type === "required" && (
              <span className="err__message">Password is required</span>
            )}

            {errors?.password?.type === "minLength" && (
              <span className="err__message">Password is invalid</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Phone number</Form.Label>
            <InputGroup>
              <Form.Select as={Col} style={{ maxWidth: "90px" }}>
                <option value="+84">+84</option>
                <option value="+86">+86</option>
                {/* Thêm các mã quốc gia khác nếu cần */}
              </Form.Select>
              <Form.Control
                {...register("phone", {
                  required: true,
                  pattern: /^\d{10}$/,
                })}
                type="text"
                placeholder="Nhập số điện thoại"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Role</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="1">User-read</option>
              <option value="2">User-write</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="">
          <Form.Group as={Col} md="6">
            {errors.phone && errors.phone.type === "required" && (
              <span className="err__message">Phone is required</span>
            )}
            {errors?.phone?.type === "pattern" && (
              <span className="err__message">Phone is invalid</span>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="12">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={5} />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <Form.Group as={Col} md="12">
            <button type="submit" className="btn-primary btn">
              Thêm mới
            </button>
          </Form.Group>
        </Row>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default CreateUser;
