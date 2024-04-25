import * as constants from 'constants/consants';

export const validateEmail = (_, value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || emailRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Địa chỉ email không hợp lệ');
};

export const validatePassword = (_, value, result) => {
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?\":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
  if (!value || passwordRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Mật khẩu gồm có ký tự đặc biệt, ký tự hoa, ký tự thường và số');
};

export const validatePhone = (_, value) => {
  const phoneRegex = /^0\d{9}$/;
  if (!value && phoneRegex.test(value)) {
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
  const priceRegex = /^\d{0,9}$/;
  if (!value || priceRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Vui lòng nhập ký tự là số và không vượt quá 10 ký tự ');
};
export const validateCycle = (_, value) => {
  const cycleRegex = /^\d+[DMY]$/;
  if (!value || cycleRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Vui lòng nhập đúng định dạng ');
};
