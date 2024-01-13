import React from 'react';
import './iconCustomize.scss';
const IconCustomize = (props) => {
  let { IconItem, color } = props;
  return (
    <>
      <div className="header__item__child">
        <svg width="100" height="100" className="header__item__icon">
          <circle style={{ stroke: color }} cx="38" cy="38" r="27" fill="none"></circle>
        </svg>
        <div className="header__icon">{IconItem}</div>
      </div>
    </>
  );
};
export default IconCustomize;
