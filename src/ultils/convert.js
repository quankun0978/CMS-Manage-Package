import * as constants from 'constants/consants';

export const convertStatus = (status) => {
  switch (status) {
    case constants.STATUS.ACTIVE:
      return 'Kích hoạt';
    case constants.STATUS.INACTIVE:
      return 'Ngừng Kích hoạt';
    default:
      break;
  }
};

export const convertCycleToDate = (cycle) => {
  let str = '';
  if (cycle.includes('D')) {
    str = cycle.replace('D', ' ngày');
  }
  if (cycle.includes('M')) {
    str = cycle.replace('M', ' tháng');
  }
  if (cycle.includes('Y')) {
    str = cycle.replace('Y', ' năm');
  }
  return str;
};

export const convertDateToCycle = (cycle) => {
  let str = '';
  if (cycle.trim().includes('ngày')) {
    str = cycle.replace('ngày','D'.trim());
  }
  if (cycle.trim().includes('tháng')) {
    str = cycle.replace('tháng','M'.trim());
  }
  if (cycle.trim().includes('năm')) {
    str = cycle.replace('năm','Y'.trim());
  }
  return str;
};
