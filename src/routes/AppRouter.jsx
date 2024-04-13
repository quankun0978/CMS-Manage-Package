import ManagePackage from 'components/Manage/ManagePackage';
import PrivateRoute, { PrivateRoute1 } from './privateRoute';
import Statistical from 'components/statistical/Statistical';
import History from 'components/statistical/History';
import ReportByPackage from 'components/statistical/ReportByPackage';
import InfoUser from 'components/Detail/InfoUser';
const { default: ManageUser } = require('components/Manage/ManageUser');
const { PATH } = require('constants/consants');
const { default: Home } = require('pages/Home');
const { default: Login } = require('pages/Login');
const { useRoutes, Navigate } = require('react-router-dom');

const AppRouter = () => {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [
        { index: true, element: <PrivateRoute component={<ManageUser />} /> },

        {
          path: PATH.QUAN_LY_NGUOI_DUNG,
          element: <PrivateRoute component={<ManageUser></ManageUser>} />,
          //   children: [
          //     { index: true, element: <TiemNang /> },
          //     { path: PATH.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
          //     { path: PATH.DETAIL_KH + '/:id', element: <KhachHangXemChiTiet /> },
          //     { path: PATH.UPDATE_KH, element: <KhachHangThemMoi /> },
          //   ],
        },

        {
          path: PATH.QUAN_LY_GOI_CUOC,
          element: <PrivateRoute component={<ManagePackage></ManagePackage>} />,
          //   children: [
          //     { index: true, element: <TiemNang /> },
          //     { path: PATH.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
          //     { path: PATH.DETAIL_KH + '/:id', element: <KhachHangXemChiTiet /> },
          //     { path: PATH.UPDATE_KH, element: <KhachHangThemMoi /> },
          //   ],
        },
        {
          path: PATH.BAO_CAO_CHUNG,
          element: <PrivateRoute component={<Statistical></Statistical>} />,
          //   children: [
          //     { index: true, element: <TiemNang /> },
          //     { path: PATH.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
          //     { path: PATH.DETAIL_KH + '/:id', element: <KhachHangXemChiTiet /> },
          //     { path: PATH.UPDATE_KH, element: <KhachHangThemMoi /> },
          //   ],
        },
        {
          path: PATH.LICH_SU_GIAO_DICH,
          element: <PrivateRoute component={<History></History>} />,
          //   children: [
          //     { index: true, element: <TiemNang /> },
          //     { path: PATH.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
          //     { path: PATH.DETAIL_KH + '/:id', element: <KhachHangXemChiTiet /> },
          //     { path: PATH.UPDATE_KH, element: <KhachHangThemMoi /> },
          //   ],
        },
        {
          path: PATH.THONG_KE_THEO_GOI_CUOC,
          element: <PrivateRoute component={<ReportByPackage></ReportByPackage>} />,
          //   children: [
          //     { index: true, element: <TiemNang /> },
          //     { path: PATH.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
          //     { path: PATH.DETAIL_KH + '/:id', element: <KhachHangXemChiTiet /> },
          //     { path: PATH.UPDATE_KH, element: <KhachHangThemMoi /> },
          //   ],
        },
        {
          path: PATH.THONG_TIN_TAI_KHOAN,
          element: <PrivateRoute component={<InfoUser></InfoUser>} />,
          //   children: [
          //     { index: true, element: <TiemNang /> },
          //     { path: PATH.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
          //     { path: PATH.DETAIL_KH + '/:id', element: <KhachHangXemChiTiet /> },
          //     { path: PATH.UPDATE_KH, element: <KhachHangThemMoi /> },
          //   ],
        },

        {
          path: '*',
          element: <Navigate to={'/'} replace />,
        },
      ],
    },
    {
      path: PATH.DANG_NHAP,
      element: <PrivateRoute1 component={<Login />} />,
    },

    // {
    //   path: ROUTES.NOT_FOUND,
    //   element: <Navigate to={ROUTES.HOME_PAGE} replace />,
    // },
  ]);
};
export default AppRouter;
