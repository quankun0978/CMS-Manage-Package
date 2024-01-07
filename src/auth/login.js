import React, { useEffect, useState } from "react";
import "./login.scss";
import logo from "../assets/logo_home.png";
import { useForm } from "react-hook-form";
// import ClipLoader from "react-spinners/ClipLoader";
import { BeatLoader } from "react-spinners";
import * as actions from "../redux/store/actions/userActions";
import image from "../assets/uNGdWHi.png";
import { connect } from "react-redux";
import { ToastContainer } from "react-bootstrap";
const Login = (props) => {
  let { checkLogin, role } = props;
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleSubmitForm = (data) => {
    if (Object.keys(data).length > 0) {
      setLoading(true);
      setTimeout(() => {
        checkLogin(data);
      }, 3000);
    }
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmitForm();
    }
  };
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [loading]);
  console.log(role);
  return (
    <>
      <div className="wrapper-login">
        <div className="container">
          <div className="card card0 border-0">
            <div className="row d-flex">
              <div className="col-lg-6">
                <div className="card1 pb-xl-5">
                  <div className="row">
                    <img src={logo} className="logo" alt="Logo" />
                  </div>
                  <div className="row px-mb-3 justify-content-center mt-4 mb-xl-5 border-line">
                    <img src={image} className="image" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-xl-5">
                  <div className="row mb-2 px-3">
                    <h3
                      className="mb-0 p-0 mt-2 w-auto header__info__bold fw-bold"
                      style={{ fontWeight: 700 }}
                    >
                      Đăng nhập
                    </h3>
                  </div>
                  <div className="row px-3 mb-4"></div>
                  <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="row px-3 ">
                      <label className="mb-1 w-auto p-0 ">
                        <h6 className="p-0  ">Email Address</h6>
                      </label>
                      <input
                        placeholder="Enter email in the format @vnpt.vn"
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <p className="message-error">Email is required</p>
                      )}
                    </div>
                    <div className="row px-3 mt-3">
                      <label className="mb-1 w-auto p-0">
                        <h6 className="p-0 ">Password</h6>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter the password"
                        {...register("password", { required: true })}
                        aria-invalid={errors.password ? "true" : "false"}
                      />
                      {errors.password &&
                        errors.password.type === "required" && (
                          <p className="message-error">Password is required</p>
                        )}
                    </div>

                    <div
                      className="row mb-3 px-3"
                      style={{
                        marginTop: "24px",
                      }}
                    >
                      <button
                        onKeyDown={(e) => handleKeyDown(e)}
                        type="submit"
                        className="btn btn-blue text-center"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-blue py-4">
              <div className="row px-5">
                <small className="ml-4 ml-sm-5 mb-2">
                  VNPT Vinaphone &copy; 2023| Tổng đài di động: 18001091 | Tổng
                  đài Internet/MyTV: 18001166
                </small>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="Loading-toggle">
            <BeatLoader loading={loading} color="#3b5998" size={20} />
          </div>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    role: state.user.role,
  };
};
const mapDispathToProps = (dispath) => {
  return {
    checkLogin: (data) => dispath(actions.checkLogin(data)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Login);