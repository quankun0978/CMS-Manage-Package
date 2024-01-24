import React from 'react';
import 'styles/iconCustomize.scss';
const IconCustomize = (props) => {
  let { IconItem, color } = props;
  return (
    <>
      <div className="header-item-child">
        <svg width="100" height="100" className="header-item-icon">
          <circle style={{ stroke: color }} cx="38" cy="38" r="27" fill="none"></circle>
        </svg>
        <div className="header-icon">{IconItem}</div>
      </div>
    </>
  );
};
export default IconCustomize;
