import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Table, Button, Row, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalEdit from 'components/Edit/ModalEditUser';
import ModalCreateUser from 'components/Create/ModalCreateUser';
import ConfirmDeleteUser from 'components/Delete/ModalDeleteUser';
import ModalResetPassword from 'components/ResetPassword/ModalResetPassword';
import { columnTableUser } from 'constants/columns';
import * as actions from 'store/actions/adminActions';
import 'styles/manage.scss';
const { Search } = Input;
const ManageUser = () => {
  const dispath = useDispatch();

  const dataTable = useRef();
  const token = Cookies.get('token');
  let dataListUser = useSelector((state) => state.admin.dataListUser);
  let resultDeleteUser = useSelector((state) => state.admin.resultDeleteUser);

  //hook

  const [inputSearch, setInputSearch] = useState('');

  const [data, setData] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    dispath(actions.getDataListUser(token));
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (dataListUser.length > 0) {
      setIsLoading(false);
      let dtTable = dataListUser.map((item, index) => {
        return {
          ...item,
          index: index + 1,
          operation: (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '10px',
              }}>
              <Tooltip placement="topLeft" title="Làm mới mật khẩu" color="">
                <Button type="primary" icon={<i class="fa-solid fa-rotate"></i>} size="default" onClick={() => handleClickResetPassword(item.username)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="chỉnh sửa">
                <Button type="primary" style={{ backgroundColor: '#ffca2c' }} icon={<EditOutlined />} size="default" onClick={() => handleClickEdit(item.username)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Xóa">
                <Button style={{ backgroundColor: 'red', color: '#fff' }} icon={<DeleteOutlined />} size="default" onClick={() => handleClickDelete(item.username)} />
              </Tooltip>
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
  }, [dataListUser, tableParams.pagination.pageSize]);

  //handle
  const handleClickEdit = (username) => {
    dispath(actions.showModalEditUser(true));
    dispath(actions.getUserByUsername(username));
  };
  const handleClickDelete = (username) => {
    dispath(actions.getUserByUsername(username));
    dispath(actions.showModalDeleteUser(true));
  };
  const handleClickResetPassword = (username) => {
    dispath(actions.getUserByUsername(username));
    dispath(actions.showModalResetPasswword(true));
  };
  const onSearch = (value, _e, info) => {
    let dataCp = [...dataTable.current];
    let dataFilter = dataCp.filter((item) => {
      return item.username.includes(value);
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
      return item.name.includes(e.target.value);
    });
    if (dataFilter.length > 0) setData(dataFilter);
    if (dataFilter.length === 0) setData([]);
    if (!e.target.value) setData(dataOrigin);
  };
  const handleClickAdd = () => {
    dispath(actions.showModalCreateUser(true));
  };
  return (
    <>
      <Row justify="space-between">
        <Search
          placeholder="Tìm kiếm theo tên đăng nhập"
          size="large"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />
        <Button style={{ marginTop: '10px' }} type="primary" size="large" onClick={handleClickAdd}>
          Thêm mới
        </Button>
      </Row>
      <Table
        columns={columnTableUser.admin}
        dataSource={data.length > 0 ? data : []}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ y: Math.floor(window.innerHeight - 350), x: 'max-content' }}
        style={{ transform: 'translateY(15px)' }}
        isLoading={isLoading}
      />
      <ModalEdit />
      <ModalCreateUser />
      <ConfirmDeleteUser />
      <ModalResetPassword />
    </>
  );
};
export default ManageUser;
