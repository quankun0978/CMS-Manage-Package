import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Table, Button, Row, Input, Modal, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

import ModalEdit from 'components/Edit/ModalEditUser';
import ModalCreateUser from 'components/Create/ModalCreateUser';

import { columnTableUser } from 'constants/columns';
import * as actions from 'store/actions/adminActions';
import * as constants from 'constants/consants';
import * as apiUser from 'api/apiUser';

import 'styles/manage.scss';

import { convertTimeString } from 'ultils/convert';
import { jwtDecode } from 'jwt-decode';

const { Search } = Input;
const { confirm } = Modal;

const ManageUser = () => {
  const dispath = useDispatch();

  const dataTable = useRef();
  const token = Cookies.get('token');
  const dataDecode = token ? jwtDecode(token) : {};
  let column = dataDecode.autoflex_role === constants.ROLE.ADMIN ? columnTableUser.admin : columnTableUser.user;
  let dataListUser = useSelector((state) => state.admin.dataListUser);

  //hook
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [userCurrent, setUserCurrent] = useState();
  const [data, setData] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    if (dataListUser.length > 0) {
      setIsLoading(false);
      let dtTable = dataListUser.map((item, index) => {
        // let parts = item.last_time.split('-');
        return {
          ...item,
          index: index + 1,
          last_time: convertTimeString(item.last_time),
          key: index,
          // last_time: parts[2] + '-' + parts[1] + '-' + parts[0],
          operation: (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '10px',
              }}>
              <Tooltip placement="topLeft" title="Làm mới mật khẩu" color="">
                <Button type="primary" icon={<i className="fa-solid fa-rotate"></i>} size="default" onClick={() => onClickResetPassword(item.username)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="chỉnh sửa">
                <Button type="primary" style={{ backgroundColor: '#ffca2c' }} icon={<EditOutlined />} size="default" onClick={() => onClickEdit(item)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Xóa">
                <Button style={{ backgroundColor: 'red', color: '#fff' }} icon={<DeleteOutlined />} size="default" onClick={() => onClickDelete(item.username)} />
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
      setLoading(true);
    } else {
      setLoading(true);
    }
  }, [dataListUser, tableParams.pagination.pageSize]);

  //handle
  const onClickEdit = (userCurrent) => {
    setIsShowModalUpdate(true);
    setUserCurrent(userCurrent);
  };
  const handleDelete = async (username) => {
    try {
      const data = await apiUser.deleteUser({ username: username }, token);

      if (data && data.data && data.data.result) {
        if (data.data.result === constants.STATUS.SUCCESS) {
          toast.success('Xóa thành công');
          dispath(actions.getDataListUser(token));
        } else {
          toast.success('Xóa không thành công');
        }
      }
    } catch (e) {
      toast.error('Xóa không thành công');
    }
  };
  const onClickDelete = (username) => {
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn xóa người dùng ${username}?`,
      onOk() {
        handleDelete(username);
      },
      onCancel() {},
    });
  };
  const handleResetPassword = async (username) => {
    try {
      const data = await apiUser.resetPasswordUser({ username: username }, token);
      if (data && data.data && data.data.result) {
        if (data.data.result.result === constants.STATUS.SUCCESS) {
          showNewPasswordReset(username, data.data.result.password);
          dispath(actions.getDataListUser(token));
        } else {
          toast.error('Làm mới không thành công');
        }
      }
    } catch (e) {
      toast.error('Làm mới không thành công');
    }
  };
  const onClickResetPassword = (username) => {
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn làm mới mật khẩu người dùng ${username}?`,
      onOk() {
        handleResetPassword(username);
      },
      onCancel() {},
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

  const handleClickAdd = () => {
    setIsShowModalCreate(true);
  };

  const showNewPasswordReset = (username, password) => {
    const confirmRef = confirm({
      width: 500,
      icon: <CheckCircleOutlined size={20} style={{ color: 'rgb(95, 199, 146)' }} />,
      title: 'Mật khẩu mới',
      content: (
        <div>
          <h6 style={{ fontWeight: 500 }}>
            Mật khẩu mới của tài khoản <span>{username}</span> là
          </h6>
          <h6 style={{ fontWeight: 600 }}>{password}</h6>
        </div>
      ),

      footer: () => (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Button onClick={() => confirmRef.destroy()}>Xác nhận</Button>
        </div>
      ),
    });
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
        {dataDecode && dataDecode.autoflex_role === constants.ROLE.ADMIN && (
          <Button style={{ marginTop: '10px' }} type="primary" size="large" onClick={handleClickAdd}>
            Thêm mới
          </Button>
        )}
      </Row>
      <Table
        loading={isLoading}
        columns={column}
        dataSource={data.length > 0 ? data : []}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ y: Math.floor(window.innerHeight - 350), x: 'max-content' }}
        style={{ transform: 'translateY(15px)' }}
        isLoading={isLoading}
      />
      <ModalEdit isModalOpen={isShowModalUpdate} setIsShowModal={setIsShowModalUpdate} dataUserByUsername={userCurrent} />
      <ModalCreateUser isModalOpen={isShowModalCreate} setIsShowModal={setIsShowModalCreate} />
    </>
  );
};

export default ManageUser;
