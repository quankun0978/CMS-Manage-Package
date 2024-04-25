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
import * as apiPackage from 'api/apiPackage';
import { convertStatus } from 'ultils/convert';
import { columnTablePackage } from 'constants/columns';

const { Option } = Select;
const { confirm } = Modal;

const ManagePackage = () => {
  const dispath = useDispatch();
  const token = Cookies.get('token');
  const dataDecode = useSelector((state) => state.user.dataDecode);
  let column = dataDecode.autoflex_role === constants.ROLE.READ ? columnTablePackage.read : columnTablePackage.write;
  const dataListPackage = useSelector((state) => state.user.dataListPackage);

  //hook
  const [loading, setLoading] = useState(false);
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [packageCurrent, setPackageCurrent] = useState();

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
                <Button type="primary" style={{ backgroundColor: '#ffca2c' }} icon={<EditOutlined />} size="default" onClick={() => handleClickEdit(item)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Xóa">
                <Button style={{ backgroundColor: 'red', color: '#fff' }} icon={<DeleteOutlined />} size="default" onClick={() => onClickDelete(item.code)} />
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

  //handle
  const handleClickCreate = () => {
    setIsShowModalCreate(true);
  };
  const handleClickEdit = (packageCurrent) => {
    setPackageCurrent({ ...packageCurrent, cycle: convert.convertDateToCycle(packageCurrent.cycle) });
    setIsShowModalUpdate(true);
  };
  const handleDelete = async (packagecode) => {
    try {
      const data = await apiPackage.deletePackageByCode({ package_code: packagecode }, token);

      if (data && data.data && data.data.result) {
        if (data.data.result === constants.STATUS.SUCCESS) {
          toast.success('Xóa thành công');
          dispath(actions.getDataListPackage(token));
        } else {
          toast.success('Xóa không thành công');
        }
      }
    } catch (e) {
      toast.error('Xóa không thành công');
    }
  };
  const onClickDelete = (packagecode) => {
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn xóa gói cước ${packagecode}?`,
      onOk() {
        handleDelete(packagecode);
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
  const handleChangeStatus = async (packagecode, value) => {
    console.log(value);
    try {
      if (value === 'ACTIVE') {
        const data = await apiPackage.enablePackage({ package_code: packagecode }, token);
        if (data && data.data && data.data.result) {
          if (data.data.result === constants.STATUS.SUCCESS) {
            toast.success('Kích hoạt gói cước thành công');
            dispath(actions.getDataListPackage(token));
          } else {
            toast.success('Kích hoạt gói cước thành công');
          }
        }
      } else {
        const data = await apiPackage.disablePackage({ package_code: packagecode }, token);
        if (data && data.data && data.data.result) {
          if (data.data.result === constants.STATUS.SUCCESS) {
            toast.success('Ngừng kích hoạt gói cước thành công');
            dispath(actions.getDataListPackage(token));
          } else {
            toast.success('Ngừng kích hoạt gói cước thất bại');
          }
        }
      }
    } catch (e) {
      toast.error('Thất bại');
    }
  };

  const handleSelectChange = (value, packagecode) => {
    confirm({
      title: 'Xác nhận',
      content: `Bạn có muốn "${convertStatus(value)}" gói cước này?`,
      onOk() {
        handleChangeStatus(packagecode, value);
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
      <CreatePackage isModalOpen={isShowModalCreate} setIsShowModal={setIsShowModalCreate} />
      <ModalEditPackage isModalOpen={isShowModalUpdate} setIsShowModal={setIsShowModalUpdate} dataPackageByPackagecode={packageCurrent} />
      <ModalDeletePackage />
    </>
  );
};

export default ManagePackage;
