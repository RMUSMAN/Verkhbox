import { showMessage } from "react-native-flash-message";
import { call, put, takeLatest } from "redux-saga/effects";
import NavigationService from "../../navigation/NavigationService";
import * as Services from "../services/video";
import { types } from "../types/video";

// import toast from "../../shared/components/toast";
function* videoSagas(action) {
  try {
    const response = yield call(Services.getVideoList, action);
    yield put({
      type: types.GET_VIDEOS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      yield put({
        type: types.GET_VIDEOS_FAILURE,
        payload: errorMessage,
      });
    } else if (error.request) {
      yield put({
        type: types.GET_VIDEOS_FAILURE,
        payload: "Error. Please check your internet connection",
      });
    } else {
      yield put({
        type: types.GET_VIDEOS_FAILURE,
        payload: "There was some error",
      });
    }
  }
}

function* categoriesSagas(action) {
  try {
    const response = yield call(Services.getCategoriesList, action);

    yield put({
      type: types.GET_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;

      yield put({
        type: types.GET_CATEGORIES_FAILURE,
        payload: errorMessage,
      });
    } else if (error.request) {
      yield put({
        type: types.GET_CATEGORIES_FAILURE,
        payload: "Error. Please check your internet connection",
      });
    } else {
      yield put({
        type: types.GET_CATEGORIES_FAILURE,
        payload: "There was some error",
      });
    }
  }
}

export default function* videoWatcher() {
  yield takeLatest(types.GET_VIDEOS_REQUEST, videoSagas);
  yield takeLatest(types.GET_CATEGORIES_REQUEST, categoriesSagas);
}
