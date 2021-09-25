import { types } from "../../types/auth";

export function login(user) {

  return {
    type: types.LOGIN_REQUEST,
    payload: user,
  };
}

export function fbLogin(user) {
  return {
    type: types.FB_LOGIN_REQUEST,
    payload: user,
  };
}
export function changeLanguage(languageCode) {
  return {
    type: types.CHANGE_LANGUAGE,
    payload: languageCode,
  };
}

export function getVideoList() {
  return {
    type: types.GET_USER_DETAILS_REQUEST,
  };
}

export function register(user) {
  return {
    type: types.REGISTER_REQUEST,
    payload: user,
  };
}

export function registerWithPhone(user) {
  return {
    type: types.SIGN_UP_WITH_PHONE_REQUEST,
    payload: user,
  };
}

export function changeReactions(user) {
  return {
    type: types.CHANGE_USER_REACTION_REQUEST,
    payload: user,
  };
}

export function verifyCode(code) {
  return {
    type: types.VERIFY_CODE_REQUEST,
    payload: code,
  };
}

export function resendCode(code) {
  return {
    type: types.RESEND_CODE_REQUEST,
    payload: code,
  };
}
export function resetPassword(code) {
  return {
    type: types.RESET_PASS_REQUEST,
    payload: code,
  };
}

export function disablePermission() {
  return {
    type: types.DISABLE_PERMISSIONS,
  };
}

export function logout() {
  return {
    type: types.LOGOUT_REQUEST,
  };
}

export function toggleAuthMsg() {
  return {
    type: types.TOGGLE_AUTH_MSG,
  };
}

export function setUserInProgressTest(test) {
  return {
    type: types.SET_USER_IN_PROGRESS_TEST_REQUEST,
    payload: test,
  };
}
