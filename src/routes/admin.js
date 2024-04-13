import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ManageUser from 'components/Manage/ManageUser';
import ManagePackage from 'components/Manage/ManagePackage';
import Statistical from 'components/statistical/Statistical';
import DetailUser from 'components/Detail/InfoUser';
import FreeText from 'components/statistical/FreeText';
import History from 'components/statistical/History';
import SubcriptionStatus from 'components/statistical/SubcriptionStatus';
import QuantityPackage from 'components/statistical/QuantityPackage';

import { PATH } from 'constants/consants';
import ReportByPackage from 'components/statistical/ReportByPackage';
import Login from 'pages/Login';

const Admin = () => {
  return (
    <Routes>
      <Route path={PATH.QUAN_LY_NGUOI_DUNG} element={<ManageUser />} />
      <Route path={PATH.QUAN_LY_GOI_CUOC} element={<ManagePackage></ManagePackage>} />
      <Route path={PATH.LICH_SU_GIAO_DICH} element={<History></History>} />
      <Route path={PATH.TRANG_THAI_THUE_BAO} element={<SubcriptionStatus></SubcriptionStatus>} />
      <Route path={PATH.SAN_LUONG_TUNG_GOI} element={<QuantityPackage></QuantityPackage>} />
      <Route path={PATH.BAO_CAO_CHUNG} element={<Statistical></Statistical>} />
      <Route path={PATH.THONG_TIN_TAI_KHOAN} element={<DetailUser></DetailUser>} />
      <Route path={PATH.THONG_KE_THEO_GOI_CUOC} element={<ReportByPackage></ReportByPackage>} />

      <Route path="*" element={<Navigate to={PATH.QUAN_LY_NGUOI_DUNG}></Navigate>} />
    </Routes>
  );
};

export default Admin;
