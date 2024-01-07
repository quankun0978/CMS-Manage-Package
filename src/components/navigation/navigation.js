import React, { useEffect, useRef, useState } from "react";
import "./navigation.scss";
import * as menu from "./menuNav";
import "../../styles/fontawesome-free-6.4.2-web/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/store/actions/userActions";
import { toast } from "react-toastify";
import { Button, Menu } from "antd";
import SubMenu from "./subMenu";
const MenuRole = (props) => {
  let { checkLogin, isLogin, loginFail } = props;
  const [isHide, setIsHide] = useState(false);
  const [MenuRole, setMenuRole] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isHideMenuItem, setIsHideMenuItem] = useState(false);
  let navigate = useNavigate();
  const handleClickTabMenu = (item) => {
    const ListItem = document.querySelectorAll(".menu__item");
    Array.from(ListItem).forEach((i, index) => {
      if (i.className.includes("active")) {
        i.classList.remove("active");
        i.classList.add("start");
      }
    });
    Array.from(ListItem)[item.id - 1].classList.add("active");
    navigate(item.path);
  };
  useEffect(() => {
    if (localStorage.getItem("role") === "admin") setMenuRole(menu.MenuAdmin);
    if (localStorage.getItem("role") === "user-write")
      setMenuRole(menu.MenuUserWrite);
      if (localStorage.getItem("role") === "user-read")
      setMenuRole(menu.MenuUserRead);
  }, []);
  useEffect(() => {
    const ListItem = document.querySelectorAll(".menu__item");
    if (Array.from(ListItem).length > 0) {
      const index = MenuRole.findIndex(
        (item) => window.location.pathname === item.path
      );
      if (index > 0) {
        Array.from(ListItem)[index].classList.add("active");
      } else Array.from(ListItem)[0].classList.add("active");
    }
  }, [MenuRole]);
  const handleClickLogout = () => {
    localStorage.removeItem("isLogin");
    toast.success("Logout is success");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const rootSubmenuKeys = ["sub1"];
  const onOpenChange = (keys) => {
    setIsHideMenuItem(!isHideMenuItem);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const items = [
    getItem(
      "Thống kê",
      "sub1",
      <div className="menu__icon">
        <i className="fa-solid fa-chart-simple"></i>
      </div>,
      [
        getItem(
          null,
          null,
          null,
          [
            getItem(
              "Lịch sử giao dịch",
              "/thong-ke/lich-su-giao-dich"
            ),
            getItem(
              "Trạng thái thuê bao",
              "/thong-ke/trang-thai-thue-bao"
            ),
            getItem("Free Text", "/thong-ke/free-text"),
            getItem("Báo cáo chung", "/thong-ke/bao-cao-chung"),
          ],
          "group",
          true
        ),
      ]
    ),
  ];
  const handleClickChange = (item, key, keypath) => {
    navigate(item.key);
    const ListItem = document.querySelectorAll(".menu__item");
    Array.from(ListItem).forEach((i, index) => {
      if (i.className.includes("active")) {
        i.classList.remove("active");
        i.classList.add("start");
      }
    });
  };
  const handleClick = () => {
    setIsHide(!isHide);
  };
  console.log(MenuRole);
  return (
    <>
      <div className="menu">
        <div className="container">
          <div className="menu__main">
            <ul className="menu__list">
              {MenuRole.length > 0 &&
                MenuRole.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <li
                        onClick={() => handleClickTabMenu(item)}
                        className={`menu__item `}
                      >
                        <div className={`menu__icon `}>
                          <i className={item.icon}></i>
                        </div>
                        <span className="menu__info">{item.title}</span>
                      </li>
                    </div>
                  );
                })}

              {/* <li className="menu__dropdown"> */}
              {/* <div className="menu__icon">
                    <i className="fa-solid fa-chart-simple"></i>{" "}
                  </div>
                  <span>Thống kê</span> */}
              {/* <Menu
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                 
                  onClick={handleClickChange}
                  items={items}
                /> */}
              {/* </li> */}
            </ul>
          </div>
          <div className="menu__logout">
            <button
              onClick={handleClickLogout}
              className={` btn btn-outline-dark menu__logout`}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>

              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
  };
};
const mapDispathToProps = (dispath) => {
  return {
    checkLogin: (data) => dispath(actions.checkLogin(data)),
    loginFail: () => dispath(actions.loginFail()),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(MenuRole);
