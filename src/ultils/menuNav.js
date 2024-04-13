import { PATH, TITLE } from 'constants/consants';

const MenuAdmin = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: 'Quản lý người dùng',
      path: PATH.QUAN_LY_NGUOI_DUNG,
      id: 1,
      icon: 'fa-solid fa-user-group',
    },

    {
      title: 'Quản lý gói cước',
      path: PATH.QUAN_LY_GOI_CUOC,
      id: 2,
      icon: 'fa-solid fa-sim-card',
    },

    {
      title: 'Tra cứu thông tin thuê bao ',
      path: PATH.LICH_SU_GIAO_DICH,
      id: 3,

      icon: 'fa-solid fa-clock-rotate-left',
    },

    // {
    //   title: 'Trạng thái thuê bao',
    //   path: PATH.TRANG_THAI_THUE_BAO,
    //   id: 4,

    //   icon: 'fa-solid fa-chart-simple',
    // },
    {
      title: 'Thống kê theo gói cước',
      path: PATH.THONG_KE_THEO_GOI_CUOC,
      id: 4,
      icon: 'fa-solid fa-chart-simple',
    },
    // {
    //   title: 'Free text',
    //   path: PATH.FREE_TEXT,
    //   id: 6,
    //   icon: 'fa-solid fa-comments',
    // },
    {
      title: 'Báo cáo chung',
      path: PATH.BAO_CAO_CHUNG,
      id: 5,
      icon: 'fa-solid fa-square-poll-horizontal',
    },
    {
      title: 'Thông tin tài khoản',
      path: PATH.THONG_TIN_TAI_KHOAN,
      id: 6,
      icon: 'fa-solid fa-user-pen',
    },
  ];
};

const MenuUserWrite = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: 'Quản lý người dùng',
      path: PATH.QUAN_LY_NGUOI_DUNG,
      id: 1,
      icon: 'fa-solid fa-user-group',
    },
    {
      title: 'Quản lý gói cước',
      path: PATH.QUAN_LY_GOI_CUOC,
      id: 2,

      icon: 'fa-solid fa-sim-card',
    },

    {
      title: 'Tra cứu thông tin thuê bao ',
      path: PATH.LICH_SU_GIAO_DICH,
      id: 3,

      icon: 'fa-solid fa-clock-rotate-left',
    },
    // {
    //   title: 'Trạng thái thuê bao',
    //   path: PATH.TRANG_THAI_THUE_BAO,
    //   id: 3,

    //   icon: 'fa-solid fa-chart-simple',
    // },
    {
      title: 'Thống kê theo gói cước',
      path: PATH.THONG_KE_THEO_GOI_CUOC,
      id: 4,
      icon: 'fa-solid fa-chart-simple',
    },
    // {
    //   title: 'Free text',
    //   path: PATH.FREE_TEXT,
    //   id: 5,
    //   icon: 'fa-solid fa-comments',
    // },
    {
      title: 'Báo cáo chung',
      path: PATH.BAO_CAO_CHUNG,
      id: 5,
      icon: 'fa-solid fa-square-poll-horizontal',
    },
    {
      title: 'Thông tin tài khoản',
      path: PATH.THONG_TIN_TAI_KHOAN,
      id: 6,
      icon: 'fa-solid fa-user-pen',
    },
  ];
};

const MenuUserRead = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: 'Quản lý người dùng',
      path: PATH.QUAN_LY_NGUOI_DUNG,
      id: 1,
      icon: 'fa-solid fa-user-group',
    },
    {
      title: 'Quản lý gói cước',
      path: PATH.QUAN_LY_GOI_CUOC,
      id: 2,

      icon: 'fa-solid fa-sim-card',
    },

    {
      title: 'Tra cứu thông tin thuê bao ',
      path: PATH.LICH_SU_GIAO_DICH,
      id: 3,
      icon: 'fa-solid fa-clock-rotate-left',
    },
    {
      title: 'Thống kê theo gói cước',
      path: PATH.THONG_KE_THEO_GOI_CUOC,
      id: 4,
      icon: 'fa-solid fa-chart-simple',
    },
    // {
    //   title: 'Trạng thái thuê bao',
    //   path: PATH.TRANG_THAI_THUE_BAO,
    //   id: 4,

    //   icon: 'fa-solid fa-chart-simple',
    // },
    // {
    //   title: 'Free text',
    //   path: PATH.FREE_TEXT,
    //   id: 5,
    //   icon: 'fa-solid fa-comments',
    // },
    {
      title: 'Báo cáo chung',
      path: PATH.BAO_CAO_CHUNG,
      id: 5,
      icon: 'fa-solid fa-square-poll-horizontal',
    },
    {
      title: 'Thông tin tài khoản',
      path: PATH.THONG_TIN_TAI_KHOAN,
      id: 6,
      icon: 'fa-solid fa-user-pen',
    },
  ];
};

export { MenuAdmin, MenuUserWrite, MenuUserRead };
