import { ToastAndroid } from "react-native";
import { showMessage } from "react-native-flash-message";
import { call, put, takeLatest } from "redux-saga/effects";
import NavigationService from "../../navigation/NavigationService";
import * as Services from "../services/product";
import { types } from "../types/product";

// import toast from "../../shared/components/toast";

function* productListSagas(action) {
  try {
    const response = yield call(Services.getProductList, action);

    yield put({
      type: types.GET_PRODUCT_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_PRODUCT_LIST_FAILURE,
      payload: "There was some error",
    });
  }
}
function* empManualTimerSagas(action) {
  try {
    const response = yield call(Services.empManualTimer, action);

    yield put({
      type: types.ADD_MANUAL_TIMER_SUCCESS,
      payload: response.data,
    });
    showMessage({
      message: "Time Recorded successfully",
      type: "success",
    });
  } catch (error) {
    

    yield put({
      type: types.ADD_MANUAL_TIMER_FAILURE,
      payload: "There was some error",
    });
  }
}

function* customerListSagas(action) {
  try {
    const response = yield call(Services.getAllCustomers, action);

    yield put({
      type: types.GET_CUSTOMER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_CUSTOMER_LIST_FAILURE,
      payload: "There was some error",
    });
  }
}

function* contactListSagas(action) {
  try {
    const response = yield call(Services.getAllContacts, action);

    yield put({
      type: types.GET_CONTACT_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_CONTACT_LIST_FAILURE,
      payload: "There was some error",
    });
  }
}

function* updateTaskSagas(action) {
  try {
    const response = yield call(Services.updateTaskProduct, action);

    yield put({
      type: types.UPDATE_TASK_PRODUCT_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: types.GET_TASK_LIST_REQUEST,
    });
    showMessage({
      message: "Stock Updated successfully",
      type: "success",
    });
  } catch (error) {
    console.log("🚀 ~ file: product.js ~ line 99 ~ function*updateTaskSagas ~ error", JSON.stringify(error))

    yield put({
      type: types.UPDATE_TASK_PRODUCT_FAILURE,
      payload: "There was some error",
    });
  }
}
function* storeTaskWithoutDespSagas(action) {
  try {
    const response = yield call(Services.storeTaskWithoutDesp, action);
    yield put({
      type: types.STORE_TASK_WITHOUT_DESP_SUCCESS,
    });

    yield put({
      type: types.GET_TASK_LIST_REQUEST,
    });
    showMessage({
      message: "task updated successfully",
      type: "success",
    });
  } catch (error) {
    console.log("🚀 ~ file: product.js ~ line 120 ~ function*storeTaskWithoutDespSagas ~ error", error)

    yield put({
      type: types.STORE_TASK_WITHOUT_DESP_FAILURE,
      payload: "There was some error",
    });
  }
}

function* editRecordingSagas(action) {
  try {
    const response = yield call(Services.editEmployeeTimer, action);
    yield put({
      type: types.EDIT_RECORDING_SUCCESS,
    });

    yield put({
      type: types.EMPLOYEE_MONTHLY_TRACKER_REQUEST,
      payload: action.payload?.currentQuery,
    });
    const user_id = action.payload?.currentQuery?.employee_id;
    delete action.payload?.currentQuery?.employee_id;
    yield put({
      type: types.EMPLOYEE_COMPLETE_TIMER_REQUEST,
      payload: { ...action.payload?.currentQuery, user_id },
    });
    showMessage({
      message: "Recording Updated successfully",
      type: "success",
    });
  } catch (error) {
    yield put({
      type: types.EDIT_RECORDING_FAILURE,
      payload: "There was some error",
    });
  }
}

function* orderListSagas(action) {
  try {
    const response = yield call(Services.getAllOrderList, action);

    yield put({
      type: types.GET_ORDER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_ORDER_LIST_FAILURE,
      payload: "There was some error",
    });
  }
}

function* taskListSagas(action) {
  try {
    const response = yield call(Services.getTaskList, action);

    yield put({
      type: types.GET_TASK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_TASK_LIST_FAILURE,
      payload: "There was some error",
    });
  }
}

function* userListSagas(action) {
  try {
    const response = yield call(Services.getAllUsersList, action);

    yield put({
      type: types.GET_USER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_USER_LIST_FAILURE,
      payload: "There was some error",
    });
  }
}

function* deleteTaskSagas(action) {
  try {
    const response = yield call(Services.deleteTaskProduct, action);

    yield put({
      type: types.DELETE_TASK_PRODUCT_SUCCESS,
      payload: response.data,
    });
    yield put({
      type: types.GET_TASK_LIST_REQUEST,
    });
    showMessage({
      message: "Stock Deleted successfully",
      type: "success",
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_TASK_PRODUCT_FAILURE,
      payload: "There was some error",
    });
  }
}

function* uploadTaskImageSagas(action) {
  try {
    const response = yield call(Services.uploadTaskImage, action);

    yield put({
      type: types.UPLOAD_TASK_IMAGE_SUCCESS,
    });
    if (action?.payload?.type === "task") {
      yield put({
        type: types.GET_TASK_LIST_REQUEST,
      });
    } else {
      yield put({
        type: types.GET_ORDER_LIST_REQUEST,
      });
    }

    showMessage({
      message: "Image Uploaded successfully",
      type: "success",
    });
  } catch (error) {
    yield put({
      type: types.UPLOAD_TASK_IMAGE_FAILURE,
      payload: "There was some error",
    });
  }
}
function* uploadSignDocSagas(action) {
  try {
    const response = yield call(Services.uploadSignDoc, action);
    const data = Object.assign({}, action.payload);
    console.log(
      "🚀 ~ file: product.js ~ line 168 ~ function*uploadSignDocSagas ~ data",
      data
    );
    yield put({
      type: types.UPLOAD_SIGN_DOC_SUCCESS,
      payload: {
        response: response.data,
        signData: data,
      },
    });

    showMessage({
      message: "Sign Uploaded successfully",
      type: "success",
    });
    NavigationService.navigate("Summary");
  } catch (error) {
    console.log("🚀 ~ file: product.js ~ line 277 ~ function*uploadSignDocSagas ~ error", JSON.parse(JSON.stringify(error)))

    yield put({
      type: types.UPLOAD_SIGN_DOC_FAILURE,
      payload: "There was some error",
    });
  }
}

function* updateTaskStatusSagas(action) {
  try {
    const response = yield call(Services.updateTaskStatus, action);

    yield put({
      type: types.UPDATE_TASK_STATUS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_TASK_STATUS_FAILURE,
      payload: "There was some error",
    });
  }
}

function* addMeterReadingSagas(action) {
  try {
    const response = yield call(Services.addMeterReading, action);

    yield put({
      type: types.ADD_METER_READING_SUCCESS,
    });

    ToastAndroid.show("Meter Reading added successfully", ToastAndroid.SHORT);
  } catch (error) {
    yield put({
      type: types.ADD_METER_READING_FAILURE,
      payload: "There was some error",
    });
  }
}

function* startEmployeeTimerSagas(action) {
  try {
    const response = yield call(Services.startEmployeeTimer, action);

    yield put({
      type: types.START_EMPLOYEE_TIMER_SUCCESS,
      payload: { ...response.data, ...action.payload },
    });
  } catch (error) {
    yield put({
      type: types.START_EMPLOYEE_TIMER_FAILURE,
      payload: "There was some error",
    });
  }
}
function* logEmployeeTimerSagas(action) {
  try {
    const response = yield call(Services.logEmployeeTimer, action);

    yield put({
      type: types.LOG_EMPLOYEE_TIMER_SUCCESS,
      payload: action.payload,
      response,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: product.js ~ line 257 ~ function*logEmployeeTimerSagas ~ error",
      error
    );

    yield put({
      type: types.LOG_EMPLOYEE_TIMER_FAILURE,
      payload: "There was some error",
    });
  }
}
function* empCompleteTimerSagas(action) {
  try {
    const response = yield call(Services.empCompleteTimer, action);

    yield put({
      type: types.EMPLOYEE_COMPLETE_TIMER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.EMPLOYEE_COMPLETE_TIMER_FAILURE,
      payload: "There was some error",
    });
  }
}
function* empMonthlyTrackerSagas(action) {
  try {
    const response = yield call(Services.empMonthlyTracker, action);

    yield put({
      type: types.EMPLOYEE_MONTHLY_TRACKER_SUCCESS,
      payload: response.data?.data,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: product.js ~ line 257 ~ function*logEmployeeTimerSagas ~ error",
      error
    );

    yield put({
      type: types.EMPLOYEE_MONTHLY_TRACKER_FAILURE,
      payload: "There was some error",
    });
  }
}

export default function* productWatcher() {
  yield takeLatest(types.GET_PRODUCT_LIST_REQUEST, productListSagas);
  yield takeLatest(types.GET_TASK_LIST_REQUEST, taskListSagas);
  yield takeLatest(types.GET_ORDER_LIST_REQUEST, orderListSagas);
  yield takeLatest(types.UPDATE_TASK_PRODUCT_REQUEST, updateTaskSagas);
  yield takeLatest(types.DELETE_TASK_PRODUCT_REQUEST, deleteTaskSagas);
  yield takeLatest(types.UPLOAD_TASK_IMAGE_REQUEST, uploadTaskImageSagas);
  yield takeLatest(types.UPDATE_TASK_STATUS_REQUEST, updateTaskStatusSagas);
  yield takeLatest(types.GET_USER_LIST_REQUEST, userListSagas);
  yield takeLatest(types.START_EMPLOYEE_TIMER_REQUEST, startEmployeeTimerSagas);
  yield takeLatest(types.GET_CONTACT_LIST_REQUEST, contactListSagas);
  yield takeLatest(types.LOG_EMPLOYEE_TIMER_REQUEST, logEmployeeTimerSagas);
  yield takeLatest(types.ADD_METER_READING_REQUEST, addMeterReadingSagas);
  yield takeLatest(types.GET_CUSTOMER_LIST_REQUEST, customerListSagas);
  yield takeLatest(types.EDIT_RECORDING_REQUEST, editRecordingSagas);
  yield takeLatest(types.UPLOAD_SIGN_DOC_REQUEST, uploadSignDocSagas);
  yield takeLatest(
    types.EMPLOYEE_COMPLETE_TIMER_REQUEST,
    empCompleteTimerSagas
  );
  yield takeLatest(
    types.EMPLOYEE_MONTHLY_TRACKER_REQUEST,
    empMonthlyTrackerSagas
  );
  yield takeLatest(types.ADD_MANUAL_TIMER_REQUEST, empManualTimerSagas);
  yield takeLatest(
    types.STORE_TASK_WITHOUT_DESP_REQUEST,
    storeTaskWithoutDespSagas
  );
}
