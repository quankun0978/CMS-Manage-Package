import React, { useEffect, useState } from 'react';

import { Table, DatePicker, theme, Space } from 'antd';

import Cookies from 'js-cookie';
import lodash from 'lodash';

import * as ultils from 'ultils/convert';
import * as api from 'api/apiReport';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'time',
    width: '10%',
  },
  {
    title: 'Gói',
    dataIndex: 'packageCode',
    width: '10%',
  },
  {
    title: 'Doanh thu đăng ký Ngày',

    children: [
      {
        title: '(1)',
        dataIndex: 'revenue',
        key: 'revenue',
        width: '13.3%',
      },
    ],
  },
  {
    title: 'Số Lượt Đăng Ký ',

    children: [
      {
        title: '(2)',
        dataIndex: 'register',
        key: 'register',
        width: '13.3%',
        render: (text, record) => {
          const registerCount = record.successCount + record.failCount;
          return <span>{registerCount}</span>;
        },
      },
    ],
  },
  {
    title: 'Đăng Ký Thành Công  ',

    children: [
      {
        title: '(3)',
        dataIndex: 'successCount',
        key: 'successCount',
        width: '13.3%',
      },
    ],
  },

  {
    title: 'Đăng Ký Thất bại',
    children: [
      {
        title: '(4)=(2)-(3)',
        dataIndex: 'failCount',
        key: 'failCount',
        width: '13.3%',
      },
    ],
  },
  {
    title: 'Tỷ Lệ Đăng Ký Thành Công',
    children: [
      {
        title: '(5)=(3)/(2)',
        dataIndex: 'averageSuccess',
        key: 'averageSuccess',
        width: '13.3%',
        render: (text, record) => {
          const averageContact = record.successCount + record.failCount > 0 ? ((100 * record.successCount) / (record.successCount + record.failCount)).toFixed(2) : 0;
          return <span>{averageContact + '%'}</span>;
        },
      },
    ],
  },
];

const Statistical = () => {
  const { token } = theme.useToken();
  const tokenLogin = Cookies.get('token');
  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: '50%',
  };

  // hook
  // let dataInfoReport = useSelector((state) => state.user.dataInfoReport);
  const [dataInfoReport, setDataInfoReport] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [columnSum, setColumnSum] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    handleGetData({
      from: '20230101',
      to: ultils.convertDataDate,
    });
  }, []);

  useEffect(() => {
    if (dataInfoReport && dataInfoReport.result && dataInfoReport.result.length > 0) {
      setData(dataInfoReport.result);
      const dataMap = dataInfoReport.result.map((item) => {
        return {
          ...item,
          register: item.successCount + item.failCount,
          contact: item.revenue > 0 ? (item.successCount + item.failCount) / item.revenue : 0,
          success: item.successCount / (item.successCount + item.failCount),
        };
      });
      const sumRevenue = dataMap.map((item) => {
        return item['revenue'];
      });
      const sumRevenue1 = dataMap.map((item) => {
        return item['successCount'];
      });
      const sumRevenue2 = dataMap.map((item) => {
        return item['failCount'];
      });
      const sumRevenue3 = dataMap.map((item) => {
        return item['register'];
      });
      const sumRevenue4 = dataMap.map((item) => {
        return item['contact'];
      });
      const sumRevenue5 = dataMap.map((item) => {
        return item['success'];
      });
      const columnsSum = [
        {
          title: 'Tổng',
          width: '20%',
        },

        {
          title: `${lodash.sum(sumRevenue)}`,
          // title: `${lodash.sum(dataInfoReport.result.filter((item)=>Object.keys(item).map(i)=>i==="revenue"))}`,
          width: '13.3%',
        },
        {
          title: `${lodash.sum(sumRevenue3)}`,
          width: '13.3%',
        },
        {
          title: `${lodash.sum(sumRevenue1)}`,
          width: '13.3%',
        },

        {
          title: `${lodash.sum(sumRevenue2)}`,
          width: '13.3%',
        },
        {
          title: `${(lodash.sum(sumRevenue5) / sumRevenue5.length).toFixed(2) * 100 + '%'}`,
          width: '13.3%',
        },
      ];
      setColumnSum(columnsSum);
    } else setData([]);
  }, [dataInfoReport]);
  const handleGetData = async (payload) => {
    const data = await api.getInfoReport(payload, tokenLogin);
    setDataInfoReport(data.data);
  };
  const cellRender = React.useCallback((current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div className="ant-picker-cell-inner" style={current.date() === 1 ? style : {}}>
        {current.date()}
      </div>
    );
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

  const handleRangePickerChange = (dates, dateStrings) => {
    const dataDate = dateStrings.map((item) => ultils.convertToYYYYMMDD(item));
    const data = {
      from: dataDate[0],
      to: dataDate[1],
    };
    handleGetData(data);
  };
  return (
    <>
      <Space direction="horizontal">
        <DatePicker.RangePicker size="large" format={'DD-MM-YYYY'} placeholder={['Từ ngày', 'đến ngày']} onChange={handleRangePickerChange} cellRender={cellRender} />
      </Space>

      <Table
        style={{ transform: 'translateY(15px)' }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        isLoading={isLoading}
        onChange={handleTableChange}
        scroll={{
          y: 300,
          x: 'max-content',
        }}
        footer={() => <Table className="sum" dataSource={null} columns={columnSum} style={{ display: '' }}></Table>}
      />
    </>
  );
};
export default Statistical;
