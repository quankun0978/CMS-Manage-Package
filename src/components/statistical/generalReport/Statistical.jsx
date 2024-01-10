
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import ModalEditPackage from "../../Edit/EditPackage/ModalEditPackage";
const columns = [
  {
    title: "Ngày",
    dataIndex: "date",
    width: "10%",
  },
  {
    title: "Gói",
    dataIndex: "package",
    width: "10%",
  },
  {
    title: "Doanh thu đăng ký Ngày",

    children: [
      {
        title: "(1)",
        dataIndex: "revenue",
        key: "revenue",
        width: "13.3%",
      },
    ],
  },
  {
    title: "Số Lượt Đăng Ký ",

    children: [
      {
        title: "(2)",
        dataIndex: "register",
        key: "register",
        width: "13.3%",
      },
    ],
  },
  {
    title: "Đăng Ký Thành Công  ",

    children: [
      {
        title: "(3)",
        dataIndex: "success",
        key: "success",
        width: "13.3%",
      },
    ],
  },
  {
    title: "Tỷ lệ TB Tương Tác   ",

    children: [
      {
        title: "(4)=(2)/(1)",
        dataIndex: "averageContact",
        key: "averageContact",
        width: "13.3%",
      },
    ],
  },
  {
    title: "Đăng Ký Thất bại    ",

    children: [
      {
        title: "(*)",
        dataIndex: "fail",
        key: "fail",
        width: "13.3%",
      },
    ],
  },
  {
    title: "Tỷ Lệ Đăng Ký Thành Công   ",

    children: [
      {
        title: "(5)=(3)/(2)",
        dataIndex: "averageSuccess",
        key: "averageSuccess",
        width: "13.3%",
      },
    ],
  },
];
const columnsChild = [
  {
    title: "Tổng",
    dataIndex: "date",
    width: "20%",
  },

  {
    title: "60,808,000",
    width: "13.3%",
  },
  {
    title: "3,829",
  },
  {
    title: "  2,649",
    width: "13.3%",
  },
  {
    title: "0.53%   ",
    width: "13.3%",
  },
  {
    title: "1180   ",
    width: "13.3%",
  },
  {
    title: "69.18%   ",
    width: "13.3%",
  },
];
const data = [
  {
    id: "1",
    packageId: "1",
    revenue: "58,988,000",
    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
  {
    id: "2",
    packageId: "2",
    revenue: "58,988,000",
    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
  {
    id: "3",
    packageId: "3",
    revenue: "58,988,000",
    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
  {
    id: "4",
    packageId: "4",
    revenue: "58,988,000",
    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
  {
    id: "5",
    packageId: "5",
    revenue: "58,988,000",
    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
  {
    id: "6",
    packageId: "6",
    revenue: "58,988,000",

    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
  {
    id: "7",
    packageId: "7",
    revenue: "58,988,000",

    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
  {
    id: "8",
    packageId: "8",
    revenue: "58,988,000",

    date: "23/12/2022",
    package: "VD149",
    register: "3,761",
    success: "2,584",
    averageContact: "0.65%",
    fail: "1177",
    averageSuccess: "68.71%",
  },
];
const Statistical = () => {


  // hook
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
  // handle
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  };

  return (
    <>
      <Table
        style={{ transform: "translateY(15px)" }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{
          y: 300,
        }}
        footer={() => (
          <Table
            className="sum"
            dataSource={null}
            columns={columnsChild}
            style={{ display: "" }}
          ></Table>
        )}
      />
    </>
  );
};
export default Statistical;
