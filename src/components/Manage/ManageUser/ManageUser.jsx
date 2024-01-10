import React, { useEffect, useState, useRef } from "react";
import { EditOutlined, SelectOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal } from "antd";
import { Input, Select, Tooltip } from "antd";
import ModalEdit from "../../Edit/EditUser/ModalEditUser"
import * as actions from "../../../redux/store/actions/adminActions";
import { path } from "../../../ultils/constants/path";
import "./ManageUser.scss";
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
const ManageUser = (props) => {
  const dispath = useDispatch()
  const stateRedux = useSelector((state) => {
    return {
      dataAllUser: state.admin.dataAllUser,
      dataUserById: state.admin.dataUserById,
    }
  })
  const { dataAllUser } = stateRedux
  //hook

  const navigate = useNavigate();
  const dataTable = useRef();
  const [inputSearch, setInputSearch] = useState("");
  const [data, setData] = useState([]);
  const [dataSelect, setDataSelect] = useState("Enable");
  const [dataOrigin, setDataOrigin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    dispath(actions.getAllUser());
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
              <Tooltip placement="topLeft" title="chi tiết" color="">
                <Button
                  type="primary"
                  icon={<SelectOutlined />}
                  size="default"
                  onClick={() => handleClickDetail(item.id)}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title="chỉnh sửa">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#ffca2c" }}
                  icon={<EditOutlined />}
                  size="default"
                  onClick={() => handleClickEdit(item.id)}
                />
              </Tooltip>

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

  //handle
  const handleClickEdit = (id) => {
    dispath(actions.showModalEditUser(true))
    dispath(actions.getUserById(id))
  };
  const handleClickDetail = (id) => {
    navigate(`${path.CHI_TIET_NGUOI_DUNG}/${id}`);
    dispath(actions.getUserById(id))
  };
  const onSearch = (value, _e, info) => {

    let dataCp = [...dataTable.current];
    let dataFilter = dataCp.filter((item) => {
      return item.name.includes(value);
    });
    if (dataFilter.length > 0) setData(dataFilter);
    if (dataFilter.length === 0) setData([]);
    if (!value) setData(dataOrigin);
  };
  const handleChangeSelect = (e, option = options) => {
    let dt = options.find((item) => {
      return item.value === e;
    });

    Modal.confirm({
      onOk: () => { },
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
        dataSource={data.length > 0 ? data : []}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ y: 350 }}
        style={{ transform: "translateY(15px)" }}
        loading={loading}
      />
      <ModalEdit />
    </>
  );
};
export default ManageUser;
