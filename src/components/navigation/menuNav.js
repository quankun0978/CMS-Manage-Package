import React, { useRef } from "react";

const MenuAdmin = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: "Danh sách người dùng",
      path: "/danh-sach-nguoi-dung",
      id: 1,

      icon: "fa-solid fa-user-group",
    },
    {
      title: "Thêm người dùng",
      path: "/tao-moi-nguoi-dung",
      id: 2,

      icon: "fa-solid fa-user-plus",
    },
    {
      title: "Quản lý gói cước",
      path: "/danh-sach-goi-cuoc",
      id: 3,

      icon: "fa-solid fa-sim-card",
    },
    {
      title: "Thêm gói cước",
      path: "/tao-moi-goi-cuoc",
      id: 4,

      icon: "fa-solid fa-circle-plus",
    },

    {
      title: "Lịch sử giao dịch",
      path: "/thong-ke/lich-su-giao-dich",
      id: 5,

      icon: "fa-solid fa-clock-rotate-left",
    },
    {
      title: "Trạng thái thuê bao",
      path: "/thong-ke/trang-thai-thue-bao",
      id: 6,

      icon: "fa-solid fa-chart-simple",
    },
    {
      title: "Free Text",
      path: "/thong-ke/free-text",
      id: 7,

      icon: "fa-solid fa-comments",
    },
    {
      title: "Báo cáo chung",
      path: "/thong-ke/bao-cao-chung",
      id: 8,
      icon: "fa-solid fa-square-poll-horizontal",
    },
  ];
};

const MenuUserWrite = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: "Quản lý gói cước",
      path: "/danh-sach-goi-cuoc",
      id: 1,

      icon: "fa-solid fa-sim-card",
    },
    {
      title: "Thêm gói cước",
      path: "/tao-moi-goi-cuoc",
      id: 2,

      icon: "fa-solid fa-circle-plus",
    },
    {
      title: "Lịch sử giao dịch",
      path: "/thong-ke/lich-su-giao-dich",
      id: 3,

      icon: "fa-solid fa-clock-rotate-left",
    },
    {
      title: "Trạng thái thuê bao",
      path: "/thong-ke/trang-thai-thue-bao",
      id: 4,

      icon: "fa-solid fa-chart-simple",
    },
    {
      title: "Free Text",
      path: "/thong-ke/free-text",
      id: 5,

      icon: "fa-solid fa-comments",
    },
    {
      title: "Báo cáo chung",
      path: "/thong-ke/bao-cao-chung",
      id: 6,
      icon: "fa-solid fa-square-poll-horizontal",
    },
  ];
};

const MenuUserRead = () => {
  // Tham chiếu đến phần tử danh sách người dùng
  return [
    {
      title: "Quản lý gói cước",
      path: "/danh-sach-goi-cuoc",
      id: 1,

      icon: "fa-solid fa-sim-card",
    },

    {
      title: "Lịch sử giao dịch",
      path: "/thong-ke/lich-su-giao-dich",
      id: 2,

      icon: "fa-solid fa-clock-rotate-left",
    },
    {
      title: "Trạng thái thuê bao",
      path: "/thong-ke/trang-thai-thue-bao",
      id: 3,

      icon: "fa-solid fa-chart-simple",
    },
    {
      title: "Free Text",
      path: "/thong-ke/free-text",
      id: 4,

      icon: "fa-solid fa-comments", 
    },
    {
      title: "Báo cáo chung",
      path: "/thong-ke/bao-cao-chung",
      id: 5,
      icon: "fa-solid fa-square-poll-horizontal",
    },
  ];
};
export { MenuAdmin, MenuUserWrite, MenuUserRead };
