import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { Modal } from 'antd';

import * as actions from 'store/actions/userActions';
import * as constants from 'constants/consants';

const ModalDeletePackage = () => {
  const token = Cookies.get('token');
  const dispath = useDispatch();
  let dataPackageByPackagecode = useSelector((state) => state.user.dataPackageByPackagecode);
  let resultDeletePackage = useSelector((state) => state.user.resultDeletePackage);
  let isModalDeletePackage = useSelector((state) => state.user.isModalDeletePackage);

  //hook
  const [isShowToast, setIsShowToast] = useState(false);
  useEffect(() => {
    if (isShowToast) {
      if (resultDeletePackage.result === constants.STATUS.FAIL || resultDeletePackage.error) {
        toast.error('Xóa không thành công');
        setIsShowToast(false);
      }
      if (resultDeletePackage.result === constants.STATUS.SUCCESS) {
        toast.success('Xóa thành công');
        setIsShowToast(false);
        dispath(actions.getDataListPackage(token));
      }
    }
  }, [dispath, isShowToast, resultDeletePackage.error, resultDeletePackage.result, token]);

  //handle
  const handleOk = () => {
    dispath(actions.handleDeletePackage(dataPackageByPackagecode.code, token));
    setIsShowToast(true);
    dispath(actions.showModalDeletePackage(false));
  };
  const handleCancel = () => {
    dispath(actions.showModalDeletePackage(false));
  };
  
  return (
    <>
      <Modal width={400} okType="danger" title={`Bạn muốn xóa gói cước ${dataPackageByPackagecode && dataPackageByPackagecode.code} chứ ?`} open={isModalDeletePackage} onOk={handleOk} onCancel={handleCancel}></Modal>
    </>
  );
};
export default ModalDeletePackage;
