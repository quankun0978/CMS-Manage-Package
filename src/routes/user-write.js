import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePackage from "../components/CreatePackage/CreatePackage";
import ManagePackage from "../components/ManagePackage/ManagePackage";
import Statistical from "../components/statistical/Statistical";
import DetailPackage from "../components/modals/Package/ModalDetailPackage";
import FreeText from "../components/statistical/freeText/FreeText";
import History from "../components/statistical/history/History";
import SubcriptionStatus from "../components/statistical/subscriptionStatus/SubcriptionStatus";
import QuantityPackage from "../components/statistical/quantity/QuantityPackage";
const UserWrite = () => {
  return (
    <>
      <Routes>
        <Route
          path="/tao-moi-goi-cuoc"
          element={<CreatePackage></CreatePackage>}
        />
        <Route
          path="/danh-sach-goi-cuoc"
          element={<ManagePackage></ManagePackage>}
        />
        <Route
          path="/dashboard/statistical"
          element={<Statistical></Statistical>}
        />
        <Route
          path="*"
          element={<Navigate to="/danh-sach-goi-cuoc"></Navigate>}
        />
        <Route
          path={`/danh-sach-goi-cuoc/goi-cuoc/:id`}
          element={<DetailPackage></DetailPackage>}
        ></Route>
        <Route
          path="/thong-ke/lich-su-giao-dich"
          element={<History></History>}
        />
        <Route
          path="/thong-ke/trang-thai-thue-bao"
          element={<SubcriptionStatus></SubcriptionStatus>}
        />
        <Route
          path="/thong-ke/free-text"
          element={<FreeText></FreeText>}
        />
        <Route
          path="/thong-ke/san-luong-tung-goi"
          element={<QuantityPackage></QuantityPackage>}
        />
        <Route
          path="/thong-ke/bao-cao-chung"
          element={<Statistical></Statistical>}
        />
      </Routes>
    </>
  );
};
export default UserWrite;
