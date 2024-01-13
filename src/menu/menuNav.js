import { path } from 'constants/path';

const MenuAdmin = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: 'Danh sách người dùng',
      path: path.DANH_SACH_NGUOI_DUNG,
      id: 1,

      icon: 'fa-solid fa-user-group',
    },
    {
      title: 'Tạo mới người dùng',
      path: path.TAO_MOI_NGUOI_DUNG,
      id: 2,

      icon: 'fa-solid fa-user-plus',
    },
    {
      title: 'Quản lý gói cước',
      path: path.DANH_SACH_GOI_CUOC,
      id: 3,

      icon: 'fa-solid fa-sim-card',
    },
    {
      title: 'Thêm gói cước',
      path: path.TAO_MOI_GOI_CUOC,
      id: 4,

      icon: 'fa-solid fa-circle-plus',
    },

    {
      title: 'Lịch sử giao dịch',
      path: path.LICH_SU_GIAO_DICH,
      id: 5,

      icon: 'fa-solid fa-clock-rotate-left',
    },
    {
      title: 'Trạng thái thuê bao',
      path: path.TRANG_THAI_THUE_BAO,
      id: 6,

      icon: 'fa-solid fa-chart-simple',
    },
    {
      title: 'Free text',
      path: path.FREE_TEXT,
      id: 7,
      icon: 'fa-solid fa-comments',
    },
    {
      title: 'Báo cáo chung',
      path: path.BAO_CAO_CHUNG,
      id: 8,
      icon: 'fa-solid fa-square-poll-horizontal',
    },
  ];
};

const MenuUserWrite = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: 'Quản lý gói cước',
      path: path.DANH_SACH_GOI_CUOC,
      id: 1,

      icon: 'fa-solid fa-sim-card',
    },
    {
      title: 'Thêm gói cước',
      path: path.TAO_MOI_GOI_CUOC,
      id: 2,

      icon: 'fa-solid fa-circle-plus',
    },

    {
      title: 'Lịch sử giao dịch',
      path: path.LICH_SU_GIAO_DICH,
      id: 3,

      icon: 'fa-solid fa-clock-rotate-left',
    },
    {
      title: 'Trạng thái thuê bao',
      path: path.TRANG_THAI_THUE_BAO,
      id: 4,

      icon: 'fa-solid fa-chart-simple',
    },
    {
      title: 'Free text',
      path: path.FREE_TEXT,
      id: 5,
      icon: 'fa-solid fa-comments',
    },
    {
      title: 'Báo cáo chung',
      path: path.BAO_CAO_CHUNG,
      id: 6,
      icon: 'fa-solid fa-square-poll-horizontal',
    },
  ];
};

const MenuUserRead = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: 'Quản lý gói cước',
      path: path.DANH_SACH_GOI_CUOC,
      id: 1,

      icon: 'fa-solid fa-sim-card',
    },

    {
      title: 'Lịch sử giao dịch',
      path: path.LICH_SU_GIAO_DICH,
      id: 2,

      icon: 'fa-solid fa-clock-rotate-left',
    },
    {
      title: 'Trạng thái thuê bao',
      path: path.TRANG_THAI_THUE_BAO,
      id: 3,

      icon: 'fa-solid fa-chart-simple',
    },
    {
      title: 'Free text',
      path: path.FREE_TEXT,
      id: 4,
      icon: 'fa-solid fa-comments',
    },
    {
      title: 'Báo cáo chung',
      path: path.BAO_CAO_CHUNG,
      id: 5,
      icon: 'fa-solid fa-square-poll-horizontal',
    },
  ];
};
export { MenuAdmin, MenuUserWrite, MenuUserRead };
