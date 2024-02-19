import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';
import { Button } from 'antd';

import { menu } from 'ultils/menu';
import * as actions from 'store/actions/userActions';
import * as constanst from 'constants/consants';
import 'assets/icon/fontawesome-free-6.4.2-web/css/all.min.css';
import 'styles/navigation.scss';

const MenuRole = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const token = Cookies.get('token');

  // hook
  const [MenuRole, setMenuRole] = useState([]);

  useEffect(() => {
    if (token) {
      setMenuRole(menu(token));
    }
  }, []);

  useEffect(() => {
    const ListItem = document.querySelectorAll('.menu-item');
    if (Array.from(ListItem).length > 0) {
      const index = MenuRole.findIndex((item) => window.location.pathname.includes(item.path));
      if (index > 0) {
        Array.from(ListItem)[index].classList.add('active');
      } else Array.from(ListItem)[0].classList.add('active');
    }
  }, [MenuRole]);

  // handle

  const handleClickTabMenu = (item) => {
    const ListItem = document.querySelectorAll('.menu-item');
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
    Cookies.remove('token');
    toast.success('Đăng xuất thành công');
    dispath(actions.logoutSuccess());
    navigate(constanst.PATH.DANG_NHAP);
  };

  return (
    <div className="menu">
      <div className="container">
        <div className="menu-main">
          <ul className="menu-list">
            {MenuRole.length > 0 &&
              MenuRole.map((item) => {
                return (
                  <div key={item.id}>
                    <li onClick={() => handleClickTabMenu(item)} className={`menu-item `}>
                      <div className={`menu-icon `}>
                        <i className={item.icon}></i>
                      </div>
                      <span className="menu-info">{item.title}</span>
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="menu-logout">
          <Button size="large" onClick={handleClickLogout} className={` menu-logout`}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Đăng xuất</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuRole;
