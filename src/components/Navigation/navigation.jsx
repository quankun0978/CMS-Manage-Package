import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MenuAdmin, MenuUserRead, MenuUserWrite } from 'menu/menuNav';
import 'assets/icon/fontawesome-free-6.4.2-web/css/all.min.css';
import './navigation.scss';
const MenuRole = () => {
  let navigate = useNavigate();
  // hook
  const [MenuRole, setMenuRole] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('role') === 'admin') setMenuRole(MenuAdmin);
    if (localStorage.getItem('role') === 'user-write') setMenuRole(MenuUserWrite);
    if (localStorage.getItem('role') === 'user-read') setMenuRole(MenuUserRead);
  }, []);
  useEffect(() => {
    const ListItem = document.querySelectorAll('.menu__item');
    if (Array.from(ListItem).length > 0) {
      const index = MenuRole.findIndex((item) => window.location.pathname.includes(item.path));
      if (index > 0) {
        Array.from(ListItem)[index].classList.add('active');
      } else Array.from(ListItem)[0].classList.add('active');
    }
  }, [MenuRole]);
  // handle

  const handleClickTabMenu = (item) => {
    const ListItem = document.querySelectorAll('.menu__item');
    Array.from(ListItem).forEach((i, index) => {
      if (i.className.includes('active')) {
        i.classList.remove('active');
        i.classList.add('start');
      }
    });
    Array.from(ListItem)[item.id - 1].classList.add('active');
    navigate(item.path);
  };

  const handleClickLogout = () => {
    localStorage.removeItem('isLogin');
    toast.success('Logout is success');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
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
                      <li onClick={() => handleClickTabMenu(item)} className={`menu__item `}>
                        <div className={`menu__icon `}>
                          <i className={item.icon}></i>
                        </div>
                        <span className="menu__info">{item.title}</span>
                      </li>
                    </div>
                  );
                })}
            </ul>
          </div>
          <div className="menu__logout">
            <Button size="large" onClick={handleClickLogout} className={` menu__logout`}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuRole;
