import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Modal } from 'antd';

import * as actions from 'store/actions/adminActions';
import * as constants from 'constants/consants';

const ModalResetPassword = () => {
  const token = Cookies.get('token');
  const dispath = useDispatch();
  let dataUserByUsername = useSelector((state) => state.admin.dataUserByUsername);
  let resultResetPassword = useSelector((state) => state.admin.resultResetPassword);
  let isModalResetPassword = useSelector((state) => state.admin.isModalResetPassword);

  //hook
  const [isShowToast, setIsShowToast] = useState(false);

  useEffect(() => {
    if (isShowToast) {
      if (resultResetPassword.result === constants.STATUS.FAIL || resultResetPassword.error) {
        toast.error("'Làm mới không thành công'");
        setIsShowToast(false);
      }
      if (resultResetPassword.result === constants.STATUS.SUCCESS) {
        toast.success('Làm mới thành công');
        setIsShowToast(false);
        dispath(actions.getDataListUser(token));
      }
    }
  }, [dispath, isShowToast, resultResetPassword.error, resultResetPassword.result, token]);

  //handle
  const handleOk = () => {
    dispath(actions.handleResetPassword(dataUserByUsername.username, token));
    setIsShowToast(true);
    dispath(actions.showModalResetPasswword(false));
    dispath(actions.getDataListUser(token));
  };
  const handleCancel = () => {
    dispath(actions.showModalResetPasswword(false));
  };
  return (
    <Modal width={400} okType="danger" title={`Bạn muốn làm mới mật khẩu người dùng ${dataUserByUsername && dataUserByUsername.username} chứ ?`} open={isModalResetPassword} onOk={handleOk} onCancel={handleCancel}></Modal>
  );
};

export default ModalResetPassword;
