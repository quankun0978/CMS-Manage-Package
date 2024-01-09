import React from "react";
import { Layout } from "antd";
import { UserOutlined, CommentOutlined } from "@ant-design/icons";
import IconCustomize from "../../customs/iconCustomize";
import "../../styles/App.scss";
import "./header.scss";
const { Header } = Layout;
const HeaderDashBoard = () => {
  return (
    <>
      <Header className="header-dashboard">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="header__section">
                <div className="header__item">
                  <h3 className="header__info">
                    Gói cước cho phép

                    <p className="m-0 header__info__bold ">15</p>
                  </h3>
                  <IconCustomize
                    color={"#5fc792"}
                    IconItem={<i className="fa-regular fa-circle-check"></i>}
                  />
                </div>
                <div className="header__item">
                  <h3 className="header__info">
                    Gói cước đã dừng
                    <p className="m-0 header__info__bold ">5</p>
                  </h3>
                  <IconCustomize
                    color={"#ff375f"}
                    IconItem={<i className="fa-solid fa-ban"></i>}
                  />
                </div>
                <div className="header__item">
                  <h3 className="header__info">
                    Doanh thu theo tháng
                    <p className="m-0 header__info__bold ">100M</p>
                  </h3>
                  <IconCustomize
                    color={"rgb(243, 170, 205)"}
                    IconItem={<i className="fa-solid fa-money-bill"></i>}
                  />
                </div>
                <div className="header__item">
                  <h3 className="header__info">
                    Số người dùng
                    <p className="m-0 header__info__bold ">100M+</p>
                  </h3>
                  <IconCustomize
                    color={" gray"}
                    IconItem={<i className="fa-solid fa-users "></i>}
                  />
                </div>

                <div className="header__item">
                  <h3 className="header__info">
                    Số gói cước
                    <p className="m-0 header__info__bold ">20</p>
                  </h3>

                  <IconCustomize
                    color=" rgb(255, 202, 44)"
                    IconItem={<CommentOutlined />}
                  ></IconCustomize>
                </div>
                <div className="header__item">
                  <h3 className="header__info">
                    Xin chào
                    <p className="m-0 fw-bold ">Nghiêm Quân</p>
                    <small>Admin</small>
                  </h3>

                  <IconCustomize
                    IconItem={<UserOutlined />}
                    color=" #0066b3"
                  ></IconCustomize>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
};
export default HeaderDashBoard;
