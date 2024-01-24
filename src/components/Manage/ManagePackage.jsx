import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Table, Button, Tooltip, Select, Modal, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CreatePackage from 'components/Create/ModalCreatePackage';
import ModalDeletePackage from 'components/Delete/ModalDeletePackage';
import ModalEditPackage from 'components/Edit/ModalEditPackage';
import * as actions from 'store/actions/userActions';
import { convertStatus } from 'ultils/convert';
import { role } from 'constants/consants';
import { columnTablePackage } from 'constants/columns';
const { Option } = Select;
const { confirm } = Modal;
const ManagePackage = () => {
  const dispath = useDispatch();
  const token = Cookies.get('token');
  let dataDecode = useSelector((state) => state.user.dataDecode);
  let resultChangeStatusPackage = useSelector((state) => state.user.resultChangeStatusPackage);
  const dataListPackage = useSelector((state) => state.user.dataListPackage);

  //hook
  const [loading, setLoading] = useState(false);
  const [isShowToast, setIsShowToast] = useState(false);
  const [data, setData] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let column = dataDecode.autoflex_role === role.READ ? columnTablePackage.read : columnTablePackage.write;
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    dispath(actions.getDataListPackage(token));
    dispath(actions.getDataDecode());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (dataListPackage.length > 0) {
      setIsLoading(false);
      let dtTable = dataListPackage.map((item, index) => {
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
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
        },
      });
    }
  }, [dataListPackage, tableParams.pagination.pageSize]);

  useEffect(() => {
    if (isShowToast) {
      if (resultChangeStatusPackage.result === 'SUCCESS') {
        toast.success('Thành công');
        setIsShowToast(false);
        dispath(actions.getDataListPackage(token));
      }
      if (resultChangeStatusPackage.result === 'FAIL' || resultChangeStatusPackage.error) {
        toast.error('Thất bại');
        setIsShowToast(false);
      }
    }
  }, [dispath, isShowToast, resultChangeStatusPackage.error, token, resultChangeStatusPackage.result, resultChangeStatusPackage.message]);
  //handle
  const handleClickCreate = () => {
    dispath(actions.showModalCreatePackage(true));
  };
  const handleClickEdit = (packagecode) => {
    dispath(actions.showModalEditPackage(true));
    dispath(actions.getPackageByPackageCode(packagecode));
  };
  const handleClickDelete = (packagecode) => {
    dispath(actions.getPackageByPackageCode(packagecode));
    dispath(actions.showModalDeletePackage(true));
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
        setIsShowToast(true);
      },
      onCancel() {},
    });
  };
  return (
    <>
      <Row>
        {dataDecode.autoflex_role && dataDecode.autoflex_role !== role.READ ? (
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
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
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
