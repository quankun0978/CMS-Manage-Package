import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Table, Button, Tooltip, Select, Modal, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CreatePackage from 'components/Create/ModalCreatePackage';
import ModalDeletePackage from 'components/Delete/ModalDeletePackage';
import ModalEditPackage from 'components/Edit/ModalEditPackage';

import * as actions from 'store/actions/userActions';
import * as constants from 'constants/consants';
import * as convert from 'ultils/convert';
import { convertStatus } from 'ultils/convert';
import { columnTablePackage } from 'constants/columns';

const { Option } = Select;
const { confirm } = Modal;

const ManagePackage = () => {
  const dispath = useDispatch();
  const token = Cookies.get('token');
  const dataDecode = useSelector((state) => state.user.dataDecode);
  const resultChangeStatusPackage = useSelector((state) => state.user.resultChangeStatusPackage);
  let column = dataDecode.autoflex_role === constants.ROLE.READ ? columnTablePackage.read : columnTablePackage.write;
  const dataListPackage = useSelector((state) => state.user.dataListPackage);
  let resultDeletePackage = useSelector((state) => state.user.resultDeletePackage);

  //hook
  const [loading, setLoading] = useState(false);
  const [isShowToastChangeStatus, setIsShowToastChangeStatus] = useState(false);
  const [isShowToastDelete, setIsShowToastDelete] = useState(false);
  const [data, setData] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    dispath(actions.getDataDecode());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    
    if (dataListPackage.length > 0) {
      setIsLoading(false);
      let dtTable = dataListPackage.map((item, index) => {
        return {
          ...item,
          index: index + 1,
          key: index,
          status: convert.convertStatus(item.status),
          operation: (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '10px',
              }}>
              <Tooltip placement="topLeft" title="chỉnh sửa">
                <Button type="primary" style={{ backgroundColor: '#ffca2c' }} icon={<EditOutlined />} size="default" onClick={() => handleClickEdit(item.code)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Xóa">
                <Button style={{ backgroundColor: 'red', color: '#fff' }} icon={<DeleteOutlined />} size="default" onClick={() => handleClickDelete(item.code)} />
              </Tooltip>
              <Select onChange={(value) => handleSelectChange(value, item.code)} value={item.status && item.status} style={{ width: '100px' }}>
                <Option value="ACTIVE">Kích hoạt</Option>
                <Option value="INACTIVE">Ngừng kich hoạt</Option>
              </Select>
            </div>
          ),
        };
      });
      setData(dtTable);
      setDataOrigin(dtTable);
      setTableParams((prevSate) => ({
        ...prevSate,
        pagination: {
          ...prevSate.pagination,
        },
      }));
    }
  }, [dataListPackage, tableParams.pagination.pageSize]);

  useEffect(() => {
    if (isShowToastChangeStatus) {
      if (resultChangeStatusPackage.result === constants.STATUS.SUCCESS) {
        toast.success('Thành công');
        setIsShowToastChangeStatus(false);
        dispath(actions.getDataListPackage(token));
      }
      if (resultChangeStatusPackage.result === constants.STATUS.FAIL || resultChangeStatusPackage.error) {
        toast.error('Thất bại');
        setIsShowToastChangeStatus(false);
      }
    }
  }, [dispath, resultChangeStatusPackage.error, token, resultChangeStatusPackage.result, resultChangeStatusPackage.message, isShowToastChangeStatus]);

  useEffect(() => {
    if (isShowToastDelete) {
      if (resultDeletePackage.result === constants.STATUS.SUCCESS) {
        toast.success('Xóa thành công');
        setIsShowToastDelete(false);
        dispath(actions.getDataListPackage(token));
      }
      if (resultDeletePackage.result === constants.STATUS.FAIL || resultDeletePackage.error) {
        toast.error('Xóa thất bại');
        setIsShowToastDelete(false);
      }
    }
  }, [dispath, resultDeletePackage.error, token, resultDeletePackage.result, resultDeletePackage.message, isShowToastDelete]);

  //handle
  const handleClickCreate = () => {
    dispath(actions.showModalCreatePackage(true));
  };
  const handleClickEdit = (packagecode) => {
    dispath(actions.showModalEditPackage(true));
    dispath(actions.getPackageByPackageCode(packagecode));
  };
  const handleClickDelete = (packagecode) => {
    // dispath(actions.getPackageByPackageCode(packagecode));
    // dispath(actions.showModalDeletePackage(true));
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn xóa gói cước ${packagecode}?`,
      onOk() {
        dispath(actions.handleDeletePackage(packagecode, token));
        setIsShowToastDelete(true);
      },
      onCancel() {},
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  };

  const handleSelectChange = (value, packagecode) => {
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn "${convertStatus(value)}" gói cước này?`,
      onOk() {
        dispath(actions.handleChangeStatusPackage(packagecode, token, value));
        setIsShowToastChangeStatus(true);
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Row>
        {dataDecode.autoflex_role && dataDecode.autoflex_role !== constants.ROLE.READ ? (
          <Button size="large" type="primary" onClick={handleClickCreate}>
            Thêm mới{' '}
          </Button>
        ) : (
          ''
        )}
      </Row>
      <Table
        style={{ transform: 'translateY(15px)' }}
        columns={column}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={isLoading}
        onChange={handleTableChange}
        scroll={{
          y: Math.floor(window.innerHeight - 350),
          x: 'max-content',
        }}
      />
      <CreatePackage />
      <ModalEditPackage />
      <ModalDeletePackage />
    </>
  );
};

export default ManagePackage;
