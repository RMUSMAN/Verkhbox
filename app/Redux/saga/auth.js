import { showMessage } from "react-native-flash-message";
import { call, put, takeLatest } from "redux-saga/effects";
import NavigationService from "../../navigation/NavigationService";
import * as Services from "../services/auth";
import { types } from "../types/auth";
import { types as videoTypes } from "../types/video";
import { types as productTypes } from "../types/product";
import moment from "moment";

// import toast from "../../shared/components/toast";
function* loginSagas(action) {
  try {
    const response = yield call(Services.login, action);

    yield put({
      type: types.LOGIN_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: productTypes.GET_PRODUCT_LIST_REQUEST,
    });
    yield put({
      type: productTypes.GET_USER_LIST_REQUEST,
    });

    yield put({
      type: productTypes.GET_TASK_LIST_REQUEST,
      payload: true,
    });

    yield put({
      type: productTypes.GET_ORDER_LIST_REQUEST,
      payload: true,
    });
    yield put({
      type: productTypes.GET_CUSTOMER_LIST_REQUEST,
    });

    yield put({
      type: productTypes.GET_CONTACT_LIST_REQUEST,
    });

    NavigationService.navigate("DrawerRoute");
  } catch (error) {
    if (error.response?.data?.error) {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: error.response?.data?.error,
      });
    } else if (error.message) {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: "Error. Please check your internet connection",
      });
    } else {
      yield put({
        type: types.LOGIN_FAILURE,
        payload: "There was some error",
      });
    }

    // if (error.response) {
    //   const errorMessage = error.response.data.message;
    //   if (
    //     errorMessage ===
    //       "Your account has not been verified, Code is sent on your mobile phone" ||
    //     errorMessage ===
    //       "Your account has not been verified, Email is sent on your email"
    //   ) {
    //     showMessage({
    //       message:
    //         "Please Verify your account. Verification Code send to your Mobile Number",
    //       type: "success",
    //     });
    //     yield put({
    //       type: types.LOGIN_FAILURE,
    //       payload: "",
    //     });
    //   } else {

    //   }
    // } else if (error.request) {

    // } else {

    // }

    // toast.error("Failed to Login. Please Try again");
  }
}

function* logoutSagas(action) {
  try {
    const response = yield call(Services.logout, action);

    yield put({
      type: types.LOGOUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.LOGOUT_FAILURE,
    });
  }
}

function* registerSagas(action) {
  try {
    const response = yield call(Services.register, action);

    yield put({
      type: types.REGISTER_SUCCESS,
      payload: response.data,
    });

    showMessage({
      message: "Account is successfully created",
      type: "success",
    });
    NavigationService.resetAndNavigate("VerifyCode");
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      yield put({
        type: types.REGISTER_FAILURE,
        payload: errorMessage,
      });
    } else if (error.request) {
      yield put({
        type: types.REGISTER_FAILURE,
        payload: "Error. Please check your internet connection",
      });
    } else {
      yield put({
        type: types.REGISTER_FAILURE,
        payload: "There was some error",
      });
    }
  }
}

function* inProgressTestStatusSagas(action) {
  try {
    const response = yield call(Services.patchUser, action);

    yield put({
      type: types.SET_USER_IN_PROGRESS_TEST_SUCCESS,
      payload: response.data,
    });
    action.payload.handleClose();
    NavigationService.navigate("TestScreen", {
      testData: action.payload.selectedTestData,
    });
  } catch (error) {
    yield put({
      type: types.SET_USER_IN_PROGRESS_TEST_FAILURE,
      payload:
        "There was some Error.Please check your internet connection & try again",
    });
  }
}

export default function* authWatcher() {
  yield takeLatest(types.REGISTER_REQUEST, registerSagas);
  yield takeLatest(types.LOGIN_REQUEST, loginSagas);
  yield takeLatest(
    types.SET_USER_IN_PROGRESS_TEST_REQUEST,
    inProgressTestStatusSagas
  );
}
