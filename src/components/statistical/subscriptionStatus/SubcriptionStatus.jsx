import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
const { Search } = Input;
const columns = [
  {
    title: "STT",
    dataIndex: "index",
    render: (index) => `${index}`,
    width: "5%",
  },
  {
    title: "Số thuê bao ",
    dataIndex: "phone",
    render: (name) => `${name}`,
    width: "10%",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",

    width: "15%",
  },
  {
    title: "Đăng ký/hủy ",
    dataIndex: "register",
    key: "register",
    filters: [
      {
        text: "Đăng ký",
        value: "Đăng ký",
      },

      {
        text: "Hủy đăng ký",
        value: "Hủy đăng ký",
      },
    ],

    onFilter: (value, record) => record.register.includes(value),
  },

  {
    title: "Gói cước",
    dataIndex: "name",
  },
  {
    title: "Dịch vụ",
    dataIndex: "service",
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
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Hiệu lực",
    dataIndex: "effect",
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
  },
  {
    id: 2,
    index: 2,
    name: "FB7",
    price: "10000",
    time: "26/06/2017 11:19:16",
    phone: "0923131313",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
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
  },
  {
    id: 4,
    index: 4,
    name: "META45",
    price: "45000",
    time: "26/06/2017 11:19:16",
    phone: "0923131313",
    register: "Đăng ký",
    service: "data",
    cycle: "1 ngày",
    status: "Thành công",
    effect: "30/01/2022",
    channel: "Facebook",
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
  },
];

const SubcriptionStatus = () => {
  //hook
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
  }, []);
  useEffect(() => {
    setLoading(true);
    if (dataInit.length > 0) {
      setLoading(false);
      let dataTable = dataInit.map((item) => {
        return {
          ...item,
        };
      });
      setData(dataTable);
      setDataOrigin(dataTable);
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
    let dataCp = [...data];
    let dataFilter = dataCp.filter((item) => {
      return item.name.includes(inputSearch);
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
        value={inputSearch}
        style={{
          width: 350,
        }}
        onChange={(e) => handleChangeInput(e)}
      />
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ y: 330 }}
        style={{ transform: "translateY(15px)" }}
        loading={loading}
      />
    </>
  );
};
export default SubcriptionStatus;
