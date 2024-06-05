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

export const convertTimeString = (timeString) => {
  // Tách các thành phần của thời gian
  const convertedDate = new Date(timeString);

  const hours = convertedDate.getHours();
  const minutes = convertedDate.getMinutes();
  const seconds = convertedDate.getSeconds();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedTime + ' ' + convertedDate.getDay() + '/' + convertedDate.getMonth() + '/' + convertedDate.getFullYear();
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
