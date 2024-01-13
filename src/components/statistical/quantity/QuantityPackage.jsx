import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { path } from 'constants/path';
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    date: '2022-12-22',
    register: 1,
    success: 0,
    ratio: '0%',
    fail: 1,
  },
  {
    key: '2',
    date: '2022-12-16',
    register: 1,
    success: 1,
    ratio: '100%',
    fail: 0,
  },
  {
    key: '3',
    date: '2022-12-07',
    register: 1,
    success: 1,
    ratio: '100%',
    fail: 0,
  },
];
const QuantityPackage = () => {
  // hook
  const navigate = useNavigate();
  // handle
  const handleClose = () => {
    navigate(path.DANH_SACH_GOI_CUOC);
  };
  return (
    <>
      <div className="detail__back  pb-3">
        <p onClick={handleClose}>
          <i class="fa-solid fa-angle-left pe-1"></i>
          Quay lại
        </p>
      </div>
      <Table dataSource={data}>
        <ColumnGroup title="Tên gói" width="10%">
          <Column title="Ngày" dataIndex="date" key="date   " />
        </ColumnGroup>
        <ColumnGroup title="FB1">
          <Column title="Số lượt đăng ký" dataIndex="register" key="register" />
          <Column title="Đăng ký thành công" dataIndex="success" key="success" />
          <Column title="Tỷ Lệ Đăng Ký Thành Công " dataIndex="ratio" key="ratio" />
          <Column title="Đăng Ký Thất bại " dataIndex="fail" key="fail" />
        </ColumnGroup>
      </Table>
    </>
  );
};

export default QuantityPackage;
