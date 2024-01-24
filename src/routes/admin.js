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
import { path } from 'constants/consants';
const Admin = () => {
  return (
    <>
      <Routes>
        <Route path={path.QUAN_LY_NGUOI_DUNG} element={<ManageUser />} />
        <Route path={path.QUAN_LY_GOI_CUOC} element={<ManagePackage></ManagePackage>} />
        <Route path={path.LICH_SU_GIAO_DICH} element={<History></History>} />
        <Route path={path.TRANG_THAI_THUE_BAO} element={<SubcriptionStatus></SubcriptionStatus>} />
        <Route path={path.FREE_TEXT} element={<FreeText></FreeText>} />
        <Route path={path.SAN_LUONG_TUNG_GOI} element={<QuantityPackage></QuantityPackage>} />
        <Route path={path.BAO_CAO_CHUNG} element={<Statistical></Statistical>} />
        <Route path={path.THONG_TIN_TAI_KHOAN} element={<DetailUser></DetailUser>} />
        <Route path="*" element={<Navigate to={path.QUAN_LY_NGUOI_DUNG}></Navigate>} />
      </Routes>
    </>
  );
};
export default Admin;
