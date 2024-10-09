import axios from 'axios';

// const API_URL = "http://127.0.0.1:8000/api/user/";
const API_URL = "https://authentication-django.onrender.com/"
const Frontend_URL = "https://drf-authetication.netlify.app/"

const register = (email, name, password, password2) => {
  return axios.post(API_URL + "register/", {
    email,
    name,
    password,
    password2,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "login/", {
    email,
    password,
  });
};

const getProfile = (token) => {
  return axios.get(API_URL + "profile/", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const changePassword = (token, oldPassword, newPassword, newPassword2) => {
  return axios.post(API_URL + "changepassword/", {
    old_password: oldPassword, 
    new_password: newPassword,   
    new_password2: newPassword2  
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const sendResetPasswordEmail = (email) => {
  return axios.post(API_URL + "send-reset-password-email/", { email });
};

const resetPassword = (uid, token, password, password2) => {
  return axios.post(`${API_URL}reset-password/${uid}/${token}/`, {
    password,
    password2,
  });
};

export default {
  register,
  login,
  getProfile,
  changePassword,
  sendResetPasswordEmail,
  resetPassword,
};
