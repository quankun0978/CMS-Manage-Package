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

export const convertCycle = (cycle) => {
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
