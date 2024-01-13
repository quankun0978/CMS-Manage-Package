import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ManageUser from 'components/Manage/ManageUser/ManageUser';
import CreateUser from 'components/Create/CreateUser/CreateUser';
import CreatePackage from 'components/Create/CreatePackage/CreatePackage';
import ManagePackage from 'components/Manage/ManagePackage/ManagePackage';
import Statistical from 'components/statistical/generalReport/Statistical';
import DetailUser from 'components/Detail/DetailUser/DetailUser';
import DetailPackage from 'components/Detail/DetailPackage/DetailPackage';
import FreeText from 'components/statistical/freeText/FreeText';
import History from 'components/statistical/history/History';
import SubcriptionStatus from 'components/statistical/subscriptionStatus/SubcriptionStatus';
import QuantityPackage from 'components/statistical/quantity/QuantityPackage';
import { path } from 'constants/path';
const Admin = () => {
  return (
    <>
      <Routes>
        <Route path={path.DANH_SACH_NGUOI_DUNG} element={<ManageUser />} />
        <Route path={path.TAO_MOI_NGUOI_DUNG} element={<CreateUser></CreateUser>} />
        <Route path={path.TAO_MOI_GOI_CUOC} element={<CreatePackage></CreatePackage>} />
        <Route path={path.DANH_SACH_GOI_CUOC} element={<ManagePackage></ManagePackage>} />
        <Route path={path.LICH_SU_GIAO_DICH} element={<History></History>} />
        <Route path={path.TRANG_THAI_THUE_BAO} element={<SubcriptionStatus></SubcriptionStatus>} />
        <Route path={path.FREE_TEXT} element={<FreeText></FreeText>} />
        <Route path={path.SAN_LUONG_TUNG_GOI} element={<QuantityPackage></QuantityPackage>} />
        <Route path={path.BAO_CAO_CHUNG} element={<Statistical></Statistical>} />
        <Route path={`${path.CHI_TIET_NGUOI_DUNG}/:id`} element={<DetailUser></DetailUser>} />
        <Route path={`${path.CHI_TIET_GOI_CUOC}/:id`} element={<DetailPackage></DetailPackage>} />
        <Route path="*" element={<Navigate to={path.DANH_SACH_NGUOI_DUNG}></Navigate>} />
      </Routes>
    </>
  );
};
export default Admin;
