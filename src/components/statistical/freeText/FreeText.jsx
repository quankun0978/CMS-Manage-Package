import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Table, Input } from "antd";
import * as actions from "../../../redux/store/actions/adminActions";
const { Search } = Input;
const columns = [
  {
    title: "STT",
    dataIndex: "id",
    render: (id) => `${id}`,
    width: "10%",
  },
  {
    title: "Số thuê bao",
    dataIndex: "phone",

    render: (name) => `${name}`,
    width: "20%",
  },
  {
    title: "Gói cước",
    dataIndex: "name",

    width: "20%",
  },
  {
    title: "Dung lượng",
    dataIndex: "data",
  },
  {
    title: "Đăng ký/gia hạn",
    dataIndex: "register",
  },
  {
    title: "Chu kỳ",
    dataIndex: "cycle",
    filters: [
      {
        text: "Ngày",
        value: "ngày",
      },

      {
        text: "Tháng",
        value: "tháng",
      },
      {
        text: "Năm",
        value: "năm",
      },
    ],

    onFilter: (value, record) => record.cycle.includes(value),
  },
  {
    title: "Kênh",
    dataIndex: "channel",
  },
];

const dataInit = [
  {
    id: 1,
    index: 1,
    name: "FB1",
    price: "3000",
    time: "26/06/2017 11:19:16",
    phone: "0923131313",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
    data: "20MB",
  },
  {
    id: 2,
    index: 2,
    name: "FB7",
    price: "10000",
    time: "26/06/2017 11:19:16",
    phone: "0123456789",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
    data: "20MB",
  },
  {
    id: 3,
    index: 3,
    name: "FB30N",
    price: "30000",
    time: "26/06/2017 11:19:16",
    phone: "0943087282",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
    data: "20MB",
  },
  {
    id: 4,
    index: 4,
    name: "META45",
    price: "45000",
    time: "26/06/2017 11:19:16",
    phone: "09430872456",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
    data: "20MB",
  },
  {
    id: 5,
    index: 5,
    name: "BIG90",
    price: "90000",
    time: "26/06/2017 11:19:16",
    phone: "0923131313",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
    data: "20MB",
  },
  {
    id: 6,
    index: 6,
    name: "BIG120",
    price: "120000",
    time: "26/06/2017 11:19:16",
    phone: "0923131313",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
    data: "20MB",
  },
  {
    id: 7,
    index: 7,
    name: "D7",
    price: "7000",
    time: "26/06/2017 11:19:16",
    phone: "0923131313",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
    data: "20MB",
  },
];

const FreeText = () => {
  // hook
  const [inputSearch, setInputSearch] = useState("");
  const dataTable = useRef(dataInit);
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
    setLoading(true);
    if (dataInit.length > 0) {
      setLoading(false);
      let dtTable = dataInit.map((item) => {
        return {
          ...item,
        };
      });
      setData(dtTable);
      setDataOrigin(dtTable);
      dataTable.current = dtTable
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
        },
      });
    }
  }, [dataInit, tableParams.pagination.pageSize, dataSelect]);
  // handle
  const onSearch = (value, _e, info) => {
    let dataCp = [...dataTable.current];
    let dataFilter = dataCp.filter((item) => {
      return item.phone.includes(value);
    });
    if (dataFilter.length > 0) setData(dataFilter);
    if (dataFilter.length === 0) setData([]);
    if (!value) setData(dataOrigin);
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
      return item.phone.includes(e.target.value);
    });
    if (dataFilter.length > 0) setData(dataFilter);
    if (dataFilter.length === 0) setData([]);
    if (!e.target.value) setData(dataOrigin);
  };
  return (
    <>
      <Search
        placeholder="Nhập vào số thuê bao muốn tìm kiếm"
        allowClear
        size="large"
        onSearch={onSearch}

        style={{
          width: 350,
        }}
      />
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ y: 350 }}
        style={{ transform: "translateY(15px)" }}
        loading={loading}
      ></Table>
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
export default connect(mapStateToProps, mapDispathToProps)(FreeText);
