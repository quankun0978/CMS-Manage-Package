import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePackage from "../components/Create/CreatePackage/CreatePackage";
import ManagePackage from "../components/Manage/ManagePackage/ManagePackage";
import Statistical from "../components/statistical/generalReport/Statistical";
import DetailPackage from "../components/Detail/DetailPackage/DetailPackage";
import FreeText from "../components/statistical/freeText/FreeText";
import History from "../components/statistical/history/History";
import SubcriptionStatus from "../components/statistical/subscriptionStatus/SubcriptionStatus";
import QuantityPackage from "../components/statistical/quantity/QuantityPackage";
import { path } from "../ultils/constants/path";
const UserWrite = () => {
  return (
    <>
      <Routes>
        <Route
          path={path.DANH_SACH_GOI_CUOC}
          element={<ManagePackage></ManagePackage>}
        />
        <Route
          path={path.TAO_MOI_GOI_CUOC}
          element={<CreatePackage></CreatePackage>}
        />
        <Route path={path.LICH_SU_GIAO_DICH} element={<History></History>} />
        <Route
          path={path.TRANG_THAI_THUE_BAO}
          element={<SubcriptionStatus></SubcriptionStatus>}
        />
        <Route path={path.FREE_TEXT} element={<FreeText></FreeText>} />
        <Route
          path={path.SAN_LUONG_TUNG_GOI}
          element={<QuantityPackage></QuantityPackage>}
        />
        <Route
          path={path.BAO_CAO_CHUNG}
          element={<Statistical></Statistical>}
        />
        <Route
          path={`${path.CHI_TIET_GOI_CUOC}/:id`}
          element={<DetailPackage></DetailPackage>}
        />
        <Route
          path="*"
          element={<Navigate to={path.DANH_SACH_GOI_CUOC}></Navigate>}
        />
      </Routes>
    </>
  );
};
export default UserWrite;
