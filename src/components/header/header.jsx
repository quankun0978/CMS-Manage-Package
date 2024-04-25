import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import { Layout, Row, Col } from 'antd';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';

import IconCustomize from 'components/Icon/IconCustomize';

import * as constants from 'constants/consants';
import * as actions from 'store/actions/userActions';

import 'styles/header.scss';

const { Header } = Layout;

const HeaderDashBoard = () => {
  // let dataListUser = useSelector((state) => state.admin.dataListUser);

  let dataInfoUser = useSelector((state) => state.user.dataDecode);
  const dispath = useDispatch();

  const dataListPackage = useSelector((state) => state.user.dataListPackage);
  const dataListPackageEnable =
    dataListPackage.length > 0 &&
    dataListPackage.filter((item) => {
      return item.status === constants.STATUS.ACTIVE;
    });
  const dataListPackageDisable =
    dataListPackage.length > 0 &&
    dataListPackage.filter((item) => {
      return item.status === constants.STATUS.INACTIVE;
    });

  useEffect(() => {
    dispath(actions.getDataListPackage(Cookies.get('token')));
    dispath(actions.getDataDecode());
  }, []);

  return (
    <Header className="header-dashboard">
      <Row style={{ width: '100%' }} justify="space-between">
        <Col md={24}>
          <div className="header-section">
            <div className="header-item header-item-hide">
              <h3 className="header-info">
                Gói cước cho phép
                <p className=" title-bold ">{dataListPackageEnable && dataListPackageEnable.length}</p>
              </h3>
              <IconCustomize color="#5fc792" IconItem={<i className="fa-regular fa-circle-check"></i>} />
            </div>
            <div className="header-item header-item-hide">
              <h3 className="header-info">
                Gói cước đã dừng
                <p className=" title-bold ">{dataListPackageDisable && dataListPackageDisable.length}</p>
              </h3>
              <IconCustomize color="#ff375f" IconItem={<i className="fa-solid fa-ban"></i>} />
            </div>
            <div className="header-item header-item-hide">
              <h3 className="header-info">
                Doanh thu theo tháng
                <p className=" title-bold ">100M</p>
              </h3>
              <IconCustomize color="rgb(243, 170, 205)" IconItem={<i className="fa-solid fa-money-bill"></i>} />
            </div>

            <div className="header-item header-item-hide">
              <h3 className="header-info">
                Số gói cước
                <p className=" title-bold ">{dataListPackage && dataListPackage.length}</p>
              </h3>
              <IconCustomize color="rgb(255, 202, 44)" IconItem={<CommentOutlined />} />
            </div>
            <div className="header-item " style={{ marginRight: '0' }}>
              <h3 className="header-info">
                Xin chào
                <p style={{ margin: '0', fontWeight: 'bold' }}>{Object.keys(dataInfoUser).length > 0 && dataInfoUser['autoflex-username'].split('@gmail.com')}</p>
                <small>{Object.keys(dataInfoUser).length > 0 && dataInfoUser['autoflex_role'].charAt(0) + dataInfoUser['autoflex_role'].slice(1).toLowerCase()}</small>
              </h3>
              <IconCustomize IconItem={<UserOutlined />} color="#0066b3" />
            </div>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderDashBoard;
