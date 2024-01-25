import * as constants from 'constants/consants';

export const validateEmail = (_, value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || emailRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Địa chỉ email không hợp lệ');
};

export const validatePassword = (_, value, result) => {
  if (!value) {
    return Promise.resolve();
  }
  if (result && Object.keys(result).length > 0) {
    if (result.result === constants.STATUS.SUCCESS) {
      return Promise.resolve();
    }
  }
  return Promise.reject('Mật khẩu không chính xác');
};

export const validatePhone = (_, value) => {
  const phoneRegex = /^0\d{9}$/;
  if (!value || phoneRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Số điện thoại không hợp lệ');
};

export const validateAccount = (value) => {
  if (!value) {
    return Promise.resolve();
  }
  return Promise.reject('Tài khoản hoặc mật khẩu không chính xác');
};

export const validatePrice = (_, value) => {
  if (!value || value.length <= 10) {
    return Promise.resolve();
  }
  return Promise.reject('Giá tiền đã bị vượt quá');
};
