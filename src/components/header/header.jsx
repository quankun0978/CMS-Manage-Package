import React from 'react';
import { Layout, Row, Col } from 'antd';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import IconCustomize from 'components/Icon/IconCustomize';
import './header.scss';
const { Header } = Layout;
const HeaderDashBoard = () => (
  <Header className="header-dashboard">
    <Row style={{ width: '100%' }} justify="space-between">
      <Col md={24}>
        <div className="header__section">
          <div className="header__item">
            <h3 className="header__info">
              Gói cước cho phép
              <p className=" title-bold ">15</p>
            </h3>
            <IconCustomize color="#5fc792" IconItem={<i className="fa-regular fa-circle-check"></i>} />
          </div>
          <div className="header__item">
            <h3 className="header__info">
              Gói cước đã dừng
              <p className=" title-bold ">5</p>
            </h3>
            <IconCustomize color="#ff375f" IconItem={<i className="fa-solid fa-ban"></i>} />
          </div>
          <div className="header__item">
            <h3 className="header__info">
              Doanh thu theo tháng
              <p className=" title-bold ">100M</p>
            </h3>
            <IconCustomize color="rgb(243, 170, 205)" IconItem={<i className="fa-solid fa-money-bill"></i>} />
          </div>
          <div className="header__item">
            <h3 className="header__info">
              Số người dùng
              <p className=" title-bold ">100M+</p>
            </h3>
            <IconCustomize color="gray" IconItem={<i className="fa-solid fa-users "></i>} />
          </div>

          <div className="header__item">
            <h3 className="header__info">
              Số gói cước
              <p className=" title-bold ">20</p>
            </h3>
            <IconCustomize color="rgb(255, 202, 44)" IconItem={<CommentOutlined />} />
          </div>
          <div className="header__item">
            <h3 className="header__info">
              Xin chào
              <p style={{ margin: '0', fontWeight: 'bold' }}>Nghiêm Quân</p>
              <small>Admin</small>
            </h3>
            <IconCustomize IconItem={<UserOutlined />} color="#0066b3" />
          </div>
        </div>
      </Col>
    </Row>
  </Header>
);
export default HeaderDashBoard;
