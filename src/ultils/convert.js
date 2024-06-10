import * as constants from 'constants/consants';

export const convertStatus = (status) => {
  switch (status) {
    case constants.STATUS.ACTIVE:
      return 'Kích hoạt';
    case constants.STATUS.INACTIVE:
      return 'Ngừng Kích hoạt';
    case constants.STATUS.INVITED:
      return 'Chưa kích hoạt';
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
    str = cycle.replace('ngày', 'D'.trim()).trim();
  }
  if (cycle.trim().includes('tháng')) {
    str = cycle.replace('tháng', 'M'.trim()).trim();
  }
  if (cycle.trim().includes('năm')) {
    str = cycle.replace('năm', 'Y'.trim()).trim();
  }
  return str.replace(' ', '');
};

export const convertToYYYYMMDD = (dateString) => {
  const dateParts = dateString.split('-');
  const formattedDate = `${dateParts[2]}${dateParts[1]}${dateParts[0]}`;
  return formattedDate;
};

export const convertPhone = (phone) => {
  return '84' + phone.substring(1);
};

export const convertTimeString = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
export const convertDataDateCurrent = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};
export const convertDataDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};
