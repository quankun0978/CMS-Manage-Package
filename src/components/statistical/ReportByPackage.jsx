import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, DatePicker, theme, Space, Button, Select, Form } from 'antd';

import Cookies from 'js-cookie';

import * as ultils from 'ultils/convert';
import * as columns from 'constants/columns';
import { reportPackage } from 'api/apiPackage';
import moment from 'moment';
import dayjs from 'dayjs';

const ReportByPackage = () => {
  const { token } = theme.useToken();
  const tokenLogin = Cookies.get('token');
  const dataListPackage = useSelector((state) => state.user.dataListPackage);
  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: '50%',
  };
  const dateFormat = 'DD-MM-YYYY';

  const defaultValue = [moment('01-01-2024', dateFormat), moment('31-01-2024', dateFormat)];

  // hook
  const [data, setData] = useState([]);
  const [options, setOptions] = useState();
  const [value, setValue] = useState('');
  const [dataDate, setDataDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);

  useEffect(() => {
    if (dataListPackage && dataListPackage.length > 0) {
      let dt = dataListPackage.map((item) => {
        return {
          label: item.code,
          value: item.code,
        };
      });
      dt.push({
        label: 'BUM6M',
        value: 'BUM6M',
      });
      setOptions(dt);

      // handleGetData();
      // handleGetDataDefault();
    }
  }, [dataListPackage]);

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

  const handleGetDataDefault = async () => {
    const res = await reportPackage({ from: '20240101', to: ultils.convertDataDate(), code: 'BUM6M' }, tokenLogin);
    if (res && res.data && res.data.result.length > 0) setData(res.data.result);
  };
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
      code: '',
    };
    setDataDate(data);
  };

  const handleChange = (value) => {
    setValue(value);
  };

  const handleGetData = async () => {
    if (value && dataDate) {
      const data = { ...dataDate, code: value };
      const res = await reportPackage(data, tokenLogin);
      if (res && res.data && res.data.result) setData(res.data.result);
    }
  };
  return (
    <>
      <Form>
        <Space direction="horizontal">
          <DatePicker.RangePicker size="large" format={'DD-MM-YYYY'} placeholder={['Từ ngày', 'đến ngày']} onChange={handleRangePickerChange} cellRender={cellRender} />
          <Select
            size="large"
            placeholder="Mã gói"
            // options={[
            //   {
            //     label: 'BUM6M',
            //     values: 'BUM6M',
            //   },
            // ]}
            options={options && options.length > 0 && options}
            onChange={handleChange}
          />
          <Button size="large" onClick={handleGetData}>
            Tìm kiếm
          </Button>
        </Space>
      </Form>

      <Table
        columns={columns.columnsReportPackage(value)}
        dataSource={data.length > 0 ? data : []}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ y: Math.floor(window.innerHeight - 350), x: 'max-content' }}
        style={{ transform: 'translateY(15px)' }}
        isLoading={isLoading}
      />
    </>
  );
};
export default ReportByPackage;
