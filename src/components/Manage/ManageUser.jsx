import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

import Cookies from 'js-cookie';
import { Table, Button, Row, Input,  Modal ,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import ModalEdit from 'components/Edit/ModalEditUser';
import ModalCreateUser from 'components/Create/ModalCreateUser';
import ConfirmDeleteUser from 'components/Delete/ModalDeleteUser';
import ModalResetPassword from 'components/ResetPassword/ModalResetPassword';

import { columnTableUser } from 'constants/columns';
import * as actions from 'store/actions/adminActions';
import * as constants from 'constants/consants';
import 'styles/manage.scss';

const { Search } = Input;
const { confirm } = Modal;

const ManageUser = () => {
  const dispath = useDispatch();
  const dataTable = useRef();
  const token = Cookies.get('token');
  let dataListUser = useSelector((state) => state.admin.dataListUser);
  let resultDeleteUser = useSelector((state) => state.admin.resultDeleteUser);
  let resultResetPassword = useSelector((state) => state.admin.resultResetPassword);

  //hook

  const [inputSearch, setInputSearch] = useState('');
  const [data, setData] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowToastDelete, setIsShowToastDelete] = useState(false);
  const [isShowToastResetPassword, setIsShowToastResetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
        let parts = item.last_time.split('-');
        return {
          ...item,
          index: index + 1,
          last_time: parts[2] + '-' + parts[1] + '-' + parts[0],
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
      setLoading(true)
    }
    else{
      setLoading(true)
    }
  }, [dataListUser, tableParams.pagination.pageSize]);

  useEffect(() => {
    if (isShowToastDelete) {
      if (resultDeleteUser.result === constants.STATUS.SUCCESS) {
        toast.success('Xóa thành công');
        setIsShowToastDelete(false);
        dispath(actions.getDataListUser(token));
      }
      if (resultDeleteUser.result === constants.STATUS.FAIL || resultDeleteUser.error) {
        toast.error('Xóa thất bại');
        setIsShowToastDelete(false);
      }
    }
  }, [dispath, resultDeleteUser.error, token, resultDeleteUser.result, resultDeleteUser.message, isShowToastDelete]);
  useEffect(() => {
    if (isShowToastResetPassword) {
      if (resultResetPassword.result === constants.STATUS.SUCCESS) {
        toast.success('Làm mới thành công');
        setIsShowToastResetPassword(false);
        dispath(actions.getDataListUser(token));
      }
      if (resultResetPassword.result === constants.STATUS.FAIL || resultResetPassword.error) {
        toast.error('Làm mới thất bại');
        setIsShowToastResetPassword(false);
      }
    }
  }, [dispath, resultResetPassword.error, token, resultResetPassword.result, resultResetPassword.message, isShowToastDelete, isShowToastResetPassword]);

  //handle
  const handleClickEdit = (username) => {
    dispath(actions.showModalEditUser(true));
    dispath(actions.getUserByUsername(username));
  };
  const handleClickDelete = (username) => {
    // dispath(actions.getUserByUsername(username));
    // dispath(actions.showModalDeleteUser(true));
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn xóa người dùng ${username}?`,
      onOk() {
        dispath(actions.handleDeleteUser(username, token));
        setIsShowToastDelete(true);
      },
      onCancel() { },
    });
  };
  const handleClickResetPassword = (username) => {
    // dispath(actions.getUserByUsername(username));
    // dispath(actions.showModalResetPasswword(true));
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn làm mới mật khẩu người dùng ${username}?`,
      onOk() {
        dispath(actions.handleResetPassword(username, token));
        setIsShowToastResetPassword(true);
      },
      onCancel() { },
    });
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
