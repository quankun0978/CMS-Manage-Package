import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ManageUser from "../components/Manage/ManageUser/ManageUser";
import CreateUser from "../components/Create/CreateUser/CreateUser";
import CreatePackage from "../components/Create/CreatePackage/CreatePackage";
import ManagePackage from "../components/Manage/ManagePackage/ManagePackage";
import Statistical from "../components/statistical/generalReport/Statistical";
import DetailUser from "../components/Detail/DetailUser/modalDetailUser";
import DetailPackage from "../components/Detail/DetailPackage/ModalDetailPackage";
import FreeText from "../components/statistical/freeText/FreeText";
import History from "../components/statistical/history/History";
import SubcriptionStatus from "../components/statistical/subscriptionStatus/SubcriptionStatus";
import QuantityPackage from "../components/statistical/quantity/QuantityPackage";
const Admin = () => {
  return (
    <>
      <Routes>
        <Route path="/danh-sach-nguoi-dung" element={<ManageUser />}></Route>
        <Route path="/tao-moi-nguoi-dung" element={<CreateUser></CreateUser>} />
        <Route
          path="/tao-moi-goi-cuoc"
          element={<CreatePackage></CreatePackage>}
        />
        <Route
          path="/danh-sach-goi-cuoc"
          element={<ManagePackage></ManagePackage>}
        />
        <Route
          path="/thong-ke/lich-su-giao-dich"
          element={<History></History>}
        />
        <Route
          path="/thong-ke/trang-thai-thue-bao"
          element={<SubcriptionStatus></SubcriptionStatus>}
        />
        <Route path="/thong-ke/free-text" element={<FreeText></FreeText>} />
        <Route
          path="/thong-ke/san-luong-tung-goi"
          element={<QuantityPackage></QuantityPackage>}
        />
        <Route
          path="/thong-ke/bao-cao-chung"
          element={<Statistical></Statistical>}
        />
        <Route
          path={`/danh-sach-nguoi-dung/nguoi-dung/:id`}
          element={<DetailUser></DetailUser>}
        ></Route>
        <Route
          path={`/danh-sach-goi-cuoc/goi-cuoc/:id`}
          element={<DetailPackage></DetailPackage>}
        ></Route>
        <Route
          path="*"
          element={<Navigate to="/danh-sach-nguoi-dung"></Navigate>}
        />
      </Routes>
    </>
  );
};
export default Admin;
