import React from "react";
import "./subMenu.scss"
const SubMenu = () => {
  return (
    <>
      <div class="submenu">
        <ul class="submenu__list">
          <li class="submenu__list-item">Lịch sử tra cứu giao dịch</li>
          <li class="submenu__list-item submenu__list-item--active">
            Trạng thái thuê bao
          </li>
          <li class="submenu__list-item">Free Text</li>
          <li class="submenu__list-item">Báo cáo chung</li>
          <li class="submenu__list-item">sản lượng từng gói</li>
        </ul>
      </div>
    </>
  );
};
export default SubMenu;
