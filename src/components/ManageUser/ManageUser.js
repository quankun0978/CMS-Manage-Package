import React, { useEffect, useState, useRef } from "react";
import {
  EditOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Table, Button, Modal } from "antd";
import * as actions from "../../redux/store/actions/adminActions";
import ModalEdit from "../modals/User/modalEdit";
import "./ManageUser.scss";
import { Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
const columns = [
  {
    title: "STT",
    dataIndex: "id",

    render: (id) => `${id}`,
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (name) => `${name}`,
    width: "20%",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Phone number",
    dataIndex: "phone",

    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
];
const ManageUser = (props) => {
  
  const navigate = useNavigate();
  const options = [
    {
      value: 0,
      label: "Disable",
    },
    {
      value: 1,
      label: "Enable",
    },
  ];
  const { showModalEdit, dataAllUser, getDataAllUser, getDataUserById } = props;
  const dataTable = useRef();
  const [inputSearch, setInputSearch] = useState("");
  const [data, setData] = useState([]);
  const [dataSelect, setDataSelect] = useState("Enable");
  const [dataOrigin, setDataOrigin] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClickEdit = (id) => {
    showModalEdit(true);
    getDataUserById(id);
  };
  const handleClickDetail = (id) => {
    navigate(`/danh-sach-nguoi-dung/nguoi-dung/${id}`);
    getDataUserById(id);
  };
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const onSearch = (value, _e, info) => {
    console.log(value);
    let dataCp = [...dataTable.current];
    let dataFilter = dataCp.filter((item) => {
      return item.name.includes(value);
    });
    console.log(dataFilter);
    if (dataFilter.length > 0) setData(dataFilter);
    if (dataFilter.length === 0) setData([]);
    if (!value) setData(dataOrigin);
  };
  const handleChangeSelect = (e, option = options) => {
    let dt = options.find((item) => {
      return item.value === e;
    });

    Modal.confirm({
      onOk: () => {},
      title: "Do you want to disable this user?",
      content: "Bla bla ...",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  useEffect(() => {
    getDataAllUser();
  }, []);
  useEffect(() => {
    setLoading(true);
    if (dataAllUser.length > 0) {
      setLoading(false);

      let dtTable = dataAllUser.map((item) => {
        return {
          ...item,
          operation: (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                type="primary"
                icon={<SelectOutlined />}
                size="default"
                onClick={() => handleClickDetail(item.id)}
              />
              <Button
                type="primary"
                style={{ backgroundColor: "#ffca2c" }}
                icon={<EditOutlined />}
                size="default"
                onClick={() => handleClickEdit(item.id)}
              />
              <Select
                defaultValue="Enable"
                options={options}
                style={{
                  width: 90,
                }}
                onChange={(value) => handleChangeSelect(value, item.id)}
              />
            </div>
          ),
        };
      });
      setData(dtTable);
      dataTable.current = dtTable;
      setDataOrigin(dtTable);

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
        },
      });
    }
  }, [dataAllUser, tableParams.pagination.pageSize, dataSelect]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleChangeInput = (e) => {
    setInputSearch(e.target.value);
    let dataCp = [...data];
    let dataFilter = dataCp.filter((item) => {
      return item.name.includes(e.target.value);
    });
    if (dataFilter.length > 0) setData(dataFilter);
    if (dataFilter.length === 0) setData([]);
    if (!e.target.value) setData(dataOrigin);
  };
  return (
    <>
      <Search
        placeholder="Tìm kiếm theo tên"
        allowClear
        size="large"
        onSearch={onSearch}
        style={{
          width: 300,
        }}
      />
      <Table
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        dataSource={data.length > 0 ? data : []}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ y: 350 }}
        style={{ transform: "translateY(15px)" }}
        loading={loading}
      ></Table>

      <ModalEdit></ModalEdit>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    dataAllUser: state.admin.dataAllUser,
    dataUserById: state.admin.dataUserById,
  };
};
const mapDispathToProps = (dispath) => {
  return {
    showModalEdit: (check) => dispath(actions.showModalEditUser(check)),
    showModalDetail: (check) => dispath(actions.showModalDetailUser(check)),
    getDataAllUser: () => dispath(actions.getAllUser()),
    getDataUserById: (id) => dispath(actions.getUserById(id)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(ManageUser);
