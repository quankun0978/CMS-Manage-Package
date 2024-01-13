export const validateEmail = (_, value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || emailRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Địa chỉ email không hợp lệ');
};

export const validatePassword = (_, value) => {
  if (!value || value.length >= 8) {
    return Promise.resolve();
  }
  return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự');
};

export const validatePhone = (_, value) => {
  const phoneRegex = /^0\d{9}$/;
  if (!value || phoneRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Số điện thoại không hợp lệ');
};
