import API from "./api";
import { store } from "../store";

export function login(action) {
  return API.post("/login", action.payload);
}

export function logout() {
  const token = store.getState().authReducer.tokens?.refresh?.token;

  const logoutData = {
    refreshToken: token,
  };
  return API.post("/auth/logout", logoutData);
}

export function fbLogin(action) {
  return API.post("/auth/facebooksignin", action.payload);
}

// export function getVideoList(action) {
//   const token = store.getState().authReducer.token;

//   const userId = store.getState().authReducer.loginUser?.userId || store.getState().authReducer.loginUser?._id;

//   return API.get(`/users/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

export function register(action) {
  return API.post(`auth/signup`, action.payload);
}

export function registerWithPhone(action) {
  return API.post(`auth/signWithPhone`, action.payload);
}
export function forgotPassword(payload) {
  return API.post(`auth/forgotpassword`, payload);
}

export function verify(action) {
  return API.patch(`auth/verify`, action.payload);
}

export function resend(action) {
  return API.post(`auth/resend`, action.payload);
}

export function resetPassword(action) {
  return API.post(`auth/resetpassword`, action.payload);
}

export function patchUser(action) {
  const userId = store.getState().authReducer.loginUser?.id;
  const data = {
    testInProgress: action.payload.patchData,
  };
  return API.patch(`users/${userId}`, data);
}
