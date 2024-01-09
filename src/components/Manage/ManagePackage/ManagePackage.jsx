import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { EditOutlined, SelectOutlined } from "@ant-design/icons";
import { Table, Button, Tooltip, Select } from "antd";
import ModalEditPackage from "../../Edit/EditPackage/ModalEditPackage";
import * as actions from "../../../redux/store/actions/userActions";
import { path } from "../../../ultils/constants/path";
const columns = [
  {
    title: "STT",
    dataIndex: "index",
    render: (index) => `${index}`,
    width: "10%",
  },
  {
    title: "Tên gói ",
    dataIndex: "name",

    width: "20%",
  },
  {
    title: "GIá gói đăng ký",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price - b.price,
    width: "20%",
  },

  {
    title: "Thời hạn ",
    dataIndex: "time",
    key: "time",
    filters: [
      {
        text: "Ngày",
        value: "ngày",
      },

      {
        text: "Năm",
        value: "năm",
      },
    ],

    onFilter: (value, record) => record.time.includes(value),
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
];
const columns1 = [
  {
    title: "STT",
    dataIndex: "index",
    render: (index) => `${index}`,
    width: "15%",
  },
  {
    title: "Tên gói ",
    dataIndex: "name",

    width: "20%",
  },
  {
    title: "GIá gói đăng ký",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price - b.price,
    width: "20%",
  },

  {
    title: "Thời hạn ",
    dataIndex: "time",
    key: "time",
    filters: [
      {
        text: "Ngày",
        value: "ngày",
      },

      {
        text: "Năm",
        value: "năm",
      },
    ],

    onFilter: (value, record) => record.time.includes(value),
  },
  {
    title: "Operation",
    dataIndex: "operation",
    width: "15%",
  },
];
const ManagePackage = (props) => {
  const { showModalEdit, showModalDetail } = props;

  //hook
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  //handle
  const handleClickEdit = () => {
    showModalEdit(true);
  };
  const handleClickDetail = (id) => {
    navigate(`${path.CHI_TIET_GOI_CUOC}/${id}`);
    showModalDetail(true);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  };
  const data = [
    {
      id: 1,
      index: 1,
      name: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>FB1</span>

          <NavLink
            className="btn btn-outline-primary"
            to="/thong-ke/san-luong-tung-goi"
          >
            Sản lượng
          </NavLink>
        </div>
      ),
      price: "3000",
      time: "1 ngày",
      operation: (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Tooltip placement="topLeft" title="chi tiết" color="">
            <Button
              type="primary"
              icon={<SelectOutlined />}
              size="default"
              onClick={() => handleClickDetail(1)}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="chỉnh sửa">
            <Button
              type="primary"
              style={{ backgroundColor: "#ffca2c" }}
              icon={<EditOutlined />}
              size="default"
              onClick={() => handleClickEdit()}
            />
          </Tooltip>
          <Select
            defaultValue="Enable"
            style={{
              width: 90,
            }}
            options={[
              {
                value: "1",
                label: "Enable",
              },
              {
                value: "0",
                label: "Disable",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: 2,
      index: 2,
      name: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>FB7</span>
          <NavLink
            className="btn btn-outline-primary"
            to="/thong-ke/san-luong-tung-goi"
            ac
          >
            Sản lượng
          </NavLink>
        </div>
      ),
      price: "10000",
      time: " 7ngày",
      operation: (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            icon={<SelectOutlined />}
            onClick={() => handleClickDetail(2)}
            size="default"
            style={{ backgroundColor: "#0d6efd" }}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "#ffca2c" }}
            icon={<EditOutlined />}
            onClick={handleClickEdit}
            size="default"
          />
          <Select
            defaultValue="Enable"
            style={{
              width: 90,
            }}
            options={[
              {
                value: "1",
                label: "Enable",
              },
              {
                value: "0",
                label: "Disable",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: 3,
      index: 3,
      name: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>FB30N</span>
          <NavLink
            className="btn btn-outline-primary"
            to="/thong-ke/san-luong-tung-goi"
            ac
          >
            Sản lượng
          </NavLink>
        </div>
      ),
      price: "30000",
      time: "30 ngày",
      operation: (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            icon={<SelectOutlined />}
            onClick={() => handleClickDetail(3)}
            size="default"
            style={{ backgroundColor: "#0d6efd" }}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "#ffca2c" }}
            icon={<EditOutlined />}
            onClick={handleClickEdit}
            size="default"
          />
          <Select
            defaultValue="Enable"
            style={{
              width: 90,
            }}
            options={[
              {
                value: "1",
                label: "Enable",
              },
              {
                value: "0",
                label: "Disable",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: 4,
      index: 4,
      name: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>META45</span>
          <NavLink
            className="btn btn-outline-primary"
            to="/thong-ke/san-luong-tung-goi"
            ac
          >
            Sản lượng
          </NavLink>
        </div>
      ),
      price: "45000",
      time: "30 ngày",
      operation: (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            icon={<SelectOutlined />}
            onClick={() => handleClickDetail(4)}
            size="default"
            style={{ backgroundColor: "#0d6efd" }}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "#ffca2c" }}
            icon={<EditOutlined />}
            onClick={handleClickEdit}
            size="default"
          />
          <Select
            defaultValue="Enable"
            style={{
              width: 90,
            }}
            options={[
              {
                value: "1",
                label: "Enable",
              },
              {
                value: "0",
                label: "Disable",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: 5,
      index: 5,
      name: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>BIG90</span>
          <NavLink
            className="btn btn-outline-primary"
            to="/thong-ke/san-luong-tung-goi"
            ac
          >
            Sản lượng
          </NavLink>
        </div>
      ),
      price: "90000",
      time: "30 ngày",
      operation: (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            icon={<SelectOutlined />}
            onClick={() => handleClickDetail(5)}
            size="default"
            style={{ backgroundColor: "#0d6efd" }}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "#ffca2c" }}
            icon={<EditOutlined />}
            onClick={handleClickEdit}
            size="default"
          />
          <Select
            defaultValue="Enable"
            style={{
              width: 90,
            }}
            options={[
              {
                value: "1",
                label: "Enable",
              },
              {
                value: "0",
                label: "Disable",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: 6,
      index: 6,
      name: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>BIG120</span>
          <NavLink
            className="btn btn-outline-primary"
            to="/thong-ke/san-luong-tung-goi"
          >
            Sản lượng
          </NavLink>
        </div>
      ),
      price: "120000",
      time: "30 ngày",
      operation: (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            icon={<SelectOutlined />}
            onClick={handleClickDetail}
            size="default"
            style={{ backgroundColor: "#0d6efd" }}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "#ffca2c" }}
            icon={<EditOutlined />}
            onClick={() => handleClickDetail(6)}
            size="default"
          />
          <Select
            defaultValue="Enable"
            style={{
              width: 90,
            }}
            options={[
              {
                value: "1",
                label: "Enable",
              },
              {
                value: "0",
                label: "Disable",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: 7,
      index: 7,
      name: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>D7</span>
          <NavLink
            className="btn btn-outline-primary"
            to="/thong-ke/san-luong-tung-goi"
            ac
          >
            Sản lượng
          </NavLink>
        </div>
      ),
      price: "7000",
      time: "1 ngày",
      operation: (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            icon={<SelectOutlined />}
            onClick={() => handleClickDetail(7)}
            size="default"
            style={{ backgroundColor: "#0d6efd" }}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "#ffca2c" }}
            icon={<EditOutlined />}
            onClick={handleClickEdit}
            size="default"
          />
          <Select
            defaultValue="Enable"
            style={{
              width: 90,
            }}
            options={[
              {
                value: "1",
                label: "Enable",
              },
              {
                value: "0",
                label: "Disable",
              },
            ]}
          />
        </div>
      ),
    },
  ];
  const data1 = data.map((item) => {
    return {
      ...item,
      operation: (
        <Button
          type="primary"
          icon={<SelectOutlined />}
          onClick={() => handleClickDetail(7)}
          size="default"
          style={{ backgroundColor: "#0d6efd" }}
        />
      ),
    };
  });
  return (
    <>
      <Table
        style={{ transform: "translateY(15px)" }}
        columns={
          localStorage.getItem("role") === "user-read" ? columns1 : columns
        }
        rowKey={(record) => record.id}
        dataSource={localStorage.getItem("role") === "user-read" ? data1 : data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{
          y: 350,
        }}
      />
      <ModalEditPackage></ModalEditPackage>
    </>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispathToProps = (dispath) => {
  return {
    showModalEdit: (check) => dispath(actions.showModalEditPackage(check)),
    showModalDetail: (check) => dispath(actions.showModalDetailPackage(check)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(ManagePackage);
