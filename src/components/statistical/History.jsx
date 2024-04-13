import React, { useEffect, useState, useRef } from 'react';
import { Table, Input, Space, Button, DatePicker, theme } from 'antd';

import * as ultils from 'ultils/convert';
import Cookies from 'js-cookie';
import { historyRegistration } from 'api/apiPackage';

import * as convert from 'ultils/convert';
const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
  },
  {
    title: 'Số thuê bao ',
    dataIndex: 'msisdn',
    render: (name) => `${name}`,
    width: '10%',
  },
  {
    title: 'Thời gian',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (updateTime) => `${convert.convertTimeString(updateTime)}`,
    width: '15%',
  },
  // {
  //   title: 'Đăng ký/hủy ',
  //   dataIndex: 'register',
  //   key: 'register',
  //   filters: [
  //     {
  //       text: 'Đăng ký',
  //       value: 'Đăng ký',
  //     },

  //     {
  //       text: 'Hủy đăng ký',
  //       value: 'Hủy đăng ký',
  //     },
  //   ],

  //   onFilter: (value, record) => record.register.includes(value),
  // },

  {
    title: 'Gói cước',
    dataIndex: 'code',
  },
  // {
  //   title: 'Dịch vụ',
  //   dataIndex: 'service',
  // },
  {
    title: 'Giá cước',
    dataIndex: 'price',
  },
  {
    title: 'Chu kỳ',
    dataIndex: 'cycle',
    render: (cycle) => `${convert.convertCycleToDate(cycle)}`,

    filters: [
      {
        text: 'Ngày',
        value: 'ngày',
      },

      {
        text: 'Tháng',
        value: 'tháng',
      },
      {
        text: 'Năm',
        value: 'năm',
      },
    ],

    onFilter: (value, record) => convert.convertCycleToDate(record.cycle).includes(value),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    // width: '10%',
  },
  {
    title: 'Hiệu lực',
    dataIndex: 'expireTime',
    render: (expireTime) => `${convert.convertTimeString(expireTime)}`,
  },
  {
    title: 'Kênh',
    dataIndex: 'channel',
  },
];

const History = () => {
  const { token } = theme.useToken();
  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: '50%',
  };
  const tokenLogin = Cookies.get('token');
  const dataTable = useRef([]);
  const [value, setValue] = useState();
  const [dataHistory, setDataDate] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {}, []);

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

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleRangePickerChange = (dates, dateStrings) => {
    const dataHistory = dateStrings.map((item) => ultils.convertToYYYYMMDD(item));
    const data = {
      from: dataHistory[0],
      to: dataHistory[1],
      msisdn: '',
    };
    setDataDate(data);
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
  const handleGetData = async () => {
    if (value && dataHistory) {
      const data = { ...dataHistory, msisdn: ultils.convertPhone(value) };
      const res = await historyRegistration(data, tokenLogin);
      if (res && res.data && res.data.result) {
        const dt = res.data.result.map((item, index) => {
          return {
            ...item,
            index: index + 1,
          };
        });
        setData(dt);
      }
    }
  };

  return (
    <>
      <Space direction="horizontal">
        <Input
          onChange={onChange}
          placeholder="Nhập vào số thuê bao muốn tìm kiếm"
          size="large"
          style={{
            width: 350,
          }}
        />
        <DatePicker.RangePicker size="large" format={'DD-MM-YYYY'} placeholder={['Từ ngày', 'đến ngày']} onChange={handleRangePickerChange} cellRender={cellRender} />

        <Button size="large" onClick={handleGetData}>
          Tìm kiếm
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} pagination={tableParams.pagination} onChange={handleTableChange} scroll={{ y: 350, x: 'max-content' }} style={{ transform: 'translateY(15px)' }} isLoading={isLoading} />
    </>
  );
};
export default History;
