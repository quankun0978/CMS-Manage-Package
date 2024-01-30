import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import * as constants from 'constants/consants';
import * as actions from 'store/actions/adminActions';

const ConfirmDeleteUser = () => {
  const token = Cookies.get('token');
  const dispath = useDispatch();
  let dataUserByUsername = useSelector((state) => state.admin.dataUserByUsername);
  let resultDeleteUser = useSelector((state) => state.admin.resultDeleteUser);
  let isModalDeleteUser = useSelector((state) => state.admin.isModalDeleteUser);

  //hook
  const [isShowToast, setIsShowToast] = useState(false);

  useEffect(() => {
    if (isShowToast) {
      if (resultDeleteUser.result === constants.STATUS.FAIL || resultDeleteUser.error) {
        toast.error("'Xóa không thành công'");
        setIsShowToast(false);
      }
      if (resultDeleteUser.result === constants.STATUS.SUCCESS) {
        toast.success('Xóa  thành công');
        setIsShowToast(false);
        dispath(actions.getDataListUser(token));
      }
    }
  }, [dispath, isShowToast, resultDeleteUser, token]);

  //handle
  const handleOk = () => {
    dispath(actions.handleDeleteUser(dataUserByUsername.username, token));
    setIsShowToast(true);
    dispath(actions.showModalDeleteUser(false));
    dispath(actions.getDataListUser(token));
  };

  const handleCancel = () => {
    dispath(actions.showModalDeleteUser(false));
  };

  return (

    <Modal icon={<ExclamationCircleFilled></ExclamationCircleFilled>} okType="danger" title={`Bạn muốn xóa người dùng ${dataUserByUsername && dataUserByUsername.username} chứ ?`} open={isModalDeleteUser} onOk={handleOk} onCancel={handleCancel}></Modal>
  );
};
export default ConfirmDeleteUser;
